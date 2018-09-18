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
        const wallets = pathOr([], ['wallets'], me);
        const currentNetworkId = await asyncGetNetworkId();
        const web3Wallet = getWeb3Wallet();
        const currentNetwork = {
          id: currentNetworkId,
          name: networkIdToName(currentNetworkId),
          supported: networkIdIsSupported(currentNetworkId),
          available: true,
        };

        const networkHasChanged = !network.id || (parseInt(network.id, 10) !== parseInt(currentNetworkId, 10));
        const lastWalletUsed = path(['lastWalletUsed'], me)

        const isUserLoggedOutOfMetaMask = (lastWalletUsed && !web3Wallet); /* log out */
        const userNeedsToLogInOrRegister = (!lastWalletUsed && web3Wallet); /* log in */
        const userWalletHasChanged = ((lastWalletUsed !== web3Wallet) && (lastWalletUsed && web3Wallet)); /* Different wallet */
        const pathname = pathOr('', ['location', 'pathname'], window);
        const isPagePublic = !pathname.match(AUTH_ROUTES_REGEX);
        const isCurrentWalletLinked = wallets.includes(web3Wallet);

        const walletOutOfSyncWithSession = Boolean(
          isUserLoggedOutOfMetaMask ||
          userNeedsToLogInOrRegister ||
          userWalletHasChanged
        );
        /* Network or wallet has changed */
        if (networkHasChanged || walletOutOfSyncWithSession || (web3Wallet !== this.state.wallet)) {
          // TODO: we only need to update the network, wallet will come from me object
          if (web3Wallet) {
            await apolloClient.mutate({
              mutation: localMutations.updateNetworkAndWallet,
              variables: {
                ...currentNetwork,
                wallet: web3Wallet,
              },
            });
          }
          this.setState({
            network: currentNetwork,
            web3Wallet,
            networkHasChanged,
            isUserLoggedOutOfMetaMask,
            userNeedsToLogInOrRegister,
            userWalletHasChanged,
            isCurrentWalletLinked,
          });
        }

        /* Wallet has changed */
        if (walletOutOfSyncWithSession) {
          console.log('lastWalletUsed: ', path(['lastWalletUsed'], me), ' web3Wallet: ', web3Wallet, ' out of sync, update: ', walletOutOfSyncWithSession)
          if (userWalletHasChanged && isCurrentWalletLinked) {
            /* Update session */
            await apolloClient.mutate({
              mutation: mutations.setCurrentWallet,
              variables: { currentWallet: web3Wallet },
            });
          }
          /* Send user to link wallet */
          if (userWalletHasChanged && !isCurrentWalletLinked) {
            return Router.replace('/link');
          }
          /* Route guard */
          if (!isPagePublic) {
            if (isUserLoggedOutOfMetaMask || userNeedsToLogInOrRegister) {
              return Router.replace('/login');
            }
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
      network,
      web3Wallet,
      networkHasChanged,
      isUserLoggedOutOfMetaMask,
      userNeedsToLogInOrRegister,
      userWalletHasChanged,
      isCurrentWalletLinked,
    } = this.state;

    return (
      <Container>
        <GlobalStyles style={style} />
        <WalletContext.Provider
          value={{
            network,
            web3Wallet,
            networkHasChanged,
            isUserLoggedOutOfMetaMask,
            userNeedsToLogInOrRegister,
            userWalletHasChanged,
            isCurrentWalletLinked,
          }}
        >
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
