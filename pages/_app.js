import App, { Container } from 'next/app';
import React from 'react';
import { Provider as IntlProvider } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as log from 'loglevel';
import { pathOr } from 'ramda';

import {
  ApolloProvider,
  Query,
} from 'react-apollo';

import { setMobileDetect, mobileParser } from 'react-responsive-redux'

import withApollo from '@/shared/utils/apollo/withApollo';

import {
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
import Web3Modals from '@/components/popups/Web3Modals';
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
    const web3ModalsProps = Web3Modals.WrappedComponent.getInitialProps(ctx);
    let locals = {};

    if (isServer) {
      const { req, res } = ctx;
      const mobileDetect = mobileParser(req);
      store.dispatch(setMobileDetect(mobileDetect));
    }
    return { pageProps, web3ModalsProps, locals };
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

    const wallets = pathOr([], ['me', 'wallets'], this.props);
    const path = pathOr('', ['location', 'pathname'], window);

    /* Network and wallet polling */
    this.setState({
      interval: window.setInterval(async() => {
        if (!web3IsInstalled()) return;

        const { data } = await apolloClient.query({ query: localQueries.root });
        const { network, wallet } = data;

        log.info('network:', network);

        const currentNetworkId = await asyncGetNetworkId();
        const currentWallet = getWeb3Wallet();
        const currentNetwork = {
          id: currentNetworkId,
          name: networkIdToName(currentNetworkId),
          supported: networkIdIsSupported(currentNetworkId),
          available: true,
        };

        const networkHasChanged = !network.id || (parseInt(network.id, 10) !== parseInt(currentNetworkId, 10));
        const walletHasChanged = Boolean(
          (wallet && !currentWallet) || /* log out */
          (!wallet && currentWallet) || /* log in */
          (wallet !== currentWallet && (wallet || currentWallet)) /* Different wallet */
        );
        /* Network or wallet has changed */
        if (networkHasChanged || walletHasChanged) {
          // redirect to link wallet if wallet is not in current wallets
          // TODO: save current pathName

          if (wallets.length === 0 && path && path.match(AUTH_ROUTES_REGEX)) {
            // TODO: Route guard check
            Router.replace('/login');
          } else if (!wallets.includes(currentWallet)) {
            Router.replace('/link');
          }

          await apolloClient.mutate({
            mutation: localMutations.updateNetworkAndWallet,
            variables: {
              ...currentNetwork,
              wallet: currentWallet,
            },
          });
          this.setState({
            network: currentNetwork,
            wallet: currentWallet,
          });
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
    } = this.props;

    const {
      wallet,
    } = this.state;

    return (
      <Container>
        <GlobalStyles style={style} />
        <WalletContext.Provider value={{ wallet }}>
          <ApolloProvider client={apolloClient}>
            <IntlProvider store={store}>
              <>
                <ResizeListener />
                <Query query={localQueries.root}>
                  {({ loading, error, data }) => {
                    if (loading || error) return null;
                    return (
                      <>
                        <Web3Modals {...web3ModalsProps} />
                      </>
                    );
                  }}
                </Query>
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
