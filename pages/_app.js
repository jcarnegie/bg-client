import App, { Container } from 'next/app';
import React from 'react';
import { Provider as IntlProvider } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as log from 'loglevel';
import { path, pathOr } from 'ramda';

import {
  ApolloProvider,
  Query,
} from 'react-apollo';

import { setMobileDetect, mobileParser } from 'react-responsive-redux'

import withApollo from '@/shared/utils/apollo/withApollo';

import {
  mutations,
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';

import {
  createCrate,
} from '@/shared/utils/discord';

import {
  asyncGetNetworkId,
  web3IsInstalled,
  getWeb3Wallet,
  networkIdToName,
  networkIdIsSupported,
} from '@/shared/utils/network';

import { WalletContext } from '@/shared/utils/context';
import { AUTH_ROUTES_REGEX } from '@/shared/utils';

import BGReactGA from '@/client/utils/BGReactGA';
import configureStore from '@/client/utils/store';

import ResizeListener from '@/components/resizelistener';
import GlobalStyles from '@/components/GlobalStyles';
import DataLoading from '@/components/DataLoading';
import { withMe } from '@/components/wrappers';

import style from '@/shared/constants/style';
import {
  APP_INIT,
  APP_RESIZE,
  GA_CREATE,
} from '@/shared/constants/actions';


/* Poll web3 interface for user account with this frequency */
const WEB3_ACCOUNT_POLLING_INTERVAL = process.env.NODE_ENV === 'development' ? 1000 : 200;


if (process.env.DEPLOYED_ENV === 'production') {
  log.setDefaultLevel(log.levels.ERROR);
} else {
  log.setDefaultLevel(log.levels.INFO);
}


class BGApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const { isServer, store } = ctx;
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    let locals = {};

    if (isServer) {
      const { req, res } = ctx;
      const mobileDetect = mobileParser(req);
      store.dispatch(setMobileDetect(mobileDetect));
    }
    return { pageProps, locals };
  }

  state = {
    wallet: null,
  }

  componentDidMount() {
    this.props.store.dispatch({ type: APP_INIT });
    this.props.store.dispatch({ type: APP_RESIZE });
    const state = this.props.store.getState();
    const { apolloClient } = this.props;
    /* Bootstrap Google Analytics */
    this.props.store.dispatch({
      type: GA_CREATE,
      payload: new BGReactGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
    });

    createCrate();

    if (state.analytics.ga.pageview) {
      state.analytics.ga.pageview(window.location.pathname);
    }

    /* New block listener */
    if (web3IsInstalled()) {
      window.web3.eth.filter('latest').watch(async(error, latestBlock) => {
        if (error) {
          log.error(error);
        } else {
          log.info(`New block, tx: ${latestBlock}`);
          await apolloClient.mutate({
            mutation: localMutations.updateLatestBlock,
            variables: { tx: latestBlock },
          });
        }
      });
    }

    /* Network and wallet polling */
    this.setState({
      interval: window.setInterval(async() => {
        if (!web3IsInstalled()) return;
        const meQuery = await apolloClient.query({ query: queries.me });
        const { data } = await apolloClient.query({ query: localQueries.root });
        const { network } = data;

        const me = pathOr({}, ['data', 'me'], meQuery);
        const wallet = path(['lastWalletUsed'], me);
        // log.info('network:', network, 'me: ', me);
        const wallets = pathOr([], ['wallets'], me);
        const currentNetworkId = await asyncGetNetworkId();
        const currentWallet = getWeb3Wallet();
        const currentNetwork = {
          id: currentNetworkId,
          name: networkIdToName(currentNetworkId),
          supported: networkIdIsSupported(currentNetworkId),
          available: true,
        };

        const networkHasChanged = !network.id || (parseInt(network.id, 10) !== parseInt(currentNetworkId, 10));
        // TODO: logic has been moved to below
        const walletHasChanged = Boolean(
          (wallet && !currentWallet) || /* log out */
          (!wallet && currentWallet) || /* log in */
          (wallet !== currentWallet && (wallet || currentWallet)) /* Different wallet */
        );
        /* Network or wallet has changed */
        if (networkHasChanged || walletHasChanged) {
          // TODO: we only need to update the network, wallet will come from me object
          await apolloClient.mutate({
            mutation: localMutations.updateNetworkAndWallet,
            variables: {
              ...currentNetwork,
              wallet: currentWallet,
            },
          });
          this.setState({
            network: currentNetwork,
          });
        }

        const walletOutOfSyncWithCookie = me && path(['lastWalletUsed'], me) !== currentWallet;
        // Login state debugging
        console.log('lastWalletUsed: ', path(['lastWalletUsed'], me), ' currentWallet: ',
          currentWallet, ' out of sync, update: ', walletOutOfSyncWithCookie)
        /* Wallet has changed */
        if (walletOutOfSyncWithCookie) {
          // redirect to link wallet if wallet is not in current wallets
          // TODO: save current pathName
          const path = pathOr('', ['location', 'pathname'], window);
          if (wallets.length === 0 && path && path.match(AUTH_ROUTES_REGEX)) {
            // TODO: Route guard check
            return Router.replace('/login');
          }
          if (!currentWallet && path && path.match(AUTH_ROUTES_REGEX)) {
            // TODO: ask to login metamask for route-guarded page and no metamask wallet detected
            Router.replace('/login');
          }
          if (!wallets.includes(currentWallet)) {
            // NOTE: figure out how to handle user who does not want to link wallet...
            // Currently we force them onto the /link page
            Router.replace('/link');
          } else {
            // set current wallet
            await apolloClient.mutate({
              mutation: mutations.setCurrentWallet,
              variables: { currentWallet },
            });
          }
        }
      }, WEB3_ACCOUNT_POLLING_INTERVAL),
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
    this.setState({ interval: null });
  }

  render() {
    const {
      Component,
      pageProps,
      web3ModalsProps,
      store,
      locals,
      apolloClient,
      me,
    } = this.props;

    const {
      wallet,
    } = this.state;

    const wallet = path(['lastWalletUsed'], me);
    console.log('zzz remove wallet state wallet: ', wallet);

    return (
      <Container>
        <GlobalStyles style={style} />
        <WalletContext.Provider value={{ wallet }}>
          <ApolloProvider client={apolloClient}>
            <IntlProvider store={store}>
              <>
                <ResizeListener />
                <Component {...pageProps} {...locals} />
              </>
            </IntlProvider>
          </ApolloProvider>
        </WalletContext.Provider>
      </Container>
    );
  }
}

export default withApollo(withRedux(configureStore)(BGApp));
