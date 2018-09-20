import App, { Container } from 'next/app';
import React from 'react';
import { Provider as IntlProvider } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as log from 'loglevel';
import { contains, path, pathOr } from 'ramda';

import {
  ApolloProvider,
  Query,
} from 'react-apollo';

import { setMobileDetect, mobileParser } from 'react-responsive-redux';

import withApollo from '@/shared/utils/apollo/withApollo';

import {
  mutations,
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';

import redirect from '@/shared/utils/redirect';

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

import { GlobalContext } from '@/shared/utils/context';
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

// redirect user to /register page if metamask isn't installed
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
    web3Wallet: getWeb3Wallet(),
  }

  metamaskInstalled() {
    return web3IsInstalled();
  }

  metamaskLoggedIn() {
    if (!web3IsInstalled()) return false;
    return web3.eth.accounts[0];
  }

  hasSession(me) {
    return me.id;
  }

  userWalletHasChanged() {
    const web3Wallet = getWeb3Wallet();
    return web3Wallet !== this.state.web3Wallet;
    // const lastWalletUsed = path(['lastWalletUsed'], me);
    // console.log('me, lastWalletUsed, web3Wallet:', me, lastWalletUsed, web3Wallet);
    // return Boolean((lastWalletUsed !== web3Wallet) && (web3Wallet));
  }

  isWalletLinked(wallet, me) {
    const wallets = pathOr([], ['wallets'], me);
    return contains(wallet, wallets);
  }

  async networkChanged(currentNetworkId) {
    const { apolloClient } = this.props;
    const { data } = await apolloClient.query({
      query: localQueries.root,
    });
    const network = pathOr({}, ['network'], data);
    return !network.id || (parseInt(network.id, 10) !== parseInt(currentNetworkId, 10));
  }

  async handleWalletHasChanged(me, web3Wallet) {
    const { apolloClient } = this.props;
    log.info('calling updateUserBalances mutation');
    await apolloClient.mutate({ mutation: localMutations.updateUserBalances });
    if (this.hasSession(me)) {
      if (!this.isWalletLinked(me, web3Wallet)) {
        log.ingo('redirecting to link wallet page');
        redirect({}, '/link');
      } else {
        await apolloClient.mutate({
          mutation: mutations.setCurrentWallet,
          variables: {
            currentWallet: web3Wallet,
          },
        });
      }
    }
    const isCurrentWalletLinked = this.isWalletLinked(me, web3Wallet);
    this.setState({
      web3Wallet,
      isCurrentWalletLinked,
    });
  }

  async handleNetworkChanged(currentNetworkId, web3Wallet) {
    const { apolloClient } = this.props;
    log.info('network changed:', currentNetworkId);
    const currentNetwork = {
      id: currentNetworkId,
      name: networkIdToName(currentNetworkId),
      supported: networkIdIsSupported(currentNetworkId),
      available: true,
    };
    await apolloClient.mutate({
      mutation: localMutations.updateNetwork,
      variables: {
        ...currentNetwork,
      },
    });
    if (web3Wallet) {
      await apolloClient.mutate({
        mutation: localMutations.updateUserBalances,
      });
    }
  }

  /**
   * metamask not installed --> redirect to /register
   * metamask installed, logged out --> redirect to /login
   * wallet changed --> update user balance, either setCurrentWallet or redirect to /link
   * network changed --> update localStorage for network, update user balance
   */
  async networkAndWalletPoller() {
    const { apolloClient } = this.props;
    const pathname = pathOr('', ['location', 'pathname'], window);
    const isPagePublic = !pathname.match(AUTH_ROUTES_REGEX);

    // Todo: this isn't the place to handle MM not
    // installed - move to _app.js or withApollo
    // or elsewhere (componentWillMount?)
    // NOTE: need to do this for detecting not logged
    // in to MM at app startup
    // if (this.metamaskNotInstalled()) {
    //   /* Route guard */
    //   return isPagePublic ? null : Router.replace('/register', '/register');
    // }

    if (!this.metamaskLoggedIn() && !isPagePublic) {
      log.info('not logged in to metamask on route guarded page - redirecting to /login');
      redirect({}, '/login');
    }

    const currentNetworkId = await asyncGetNetworkId();
    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const web3Wallet = getWeb3Wallet();

    if (this.userWalletHasChanged(me)) {
      await this.handleWalletHasChanged(me, web3Wallet);
    }

    if (await this.networkChanged(currentNetworkId)) {
      await this.handleNetworkChanged(currentNetworkId, web3Wallet);
    }

    setTimeout(::this.networkAndWalletPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
  }

  async componentWillMount() {
    // Initialize Apollo local cache
    const { apolloClient } = this.props;
    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const web3Wallet = getWeb3Wallet();
    this.setState({
      isCurrentWalletLinked: contains(web3Wallet, me.wallets),
    });
    const result1 = await apolloClient.mutate({
      mutation: localMutations.updateWallet,
      variables: {
        wallet: web3Wallet,
      }
    });
    log.info('updateWallet:', result1);
    const result2 = await apolloClient.mutate({ mutation: localMutations.updateUserBalances });
    log.info('updateUserBalances:', result2);
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

    if (process.browser) {
      setTimeout(::this.networkAndWalletPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
      // setTimeout(::this.networkPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
    }
  }

  render() {
    const {
      Component,
      pageProps,
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
        <GlobalContext.Provider
          value={{
            network,
            web3Wallet,
            networkHasChanged,
            isUserLoggedOutOfMetaMask,
            userNeedsToLogInOrRegister,
            userWalletHasChanged,
            isCurrentWalletLinked,
            me,
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
        </GlobalContext.Provider>
      </Container>
    );
  }
}

export default withApollo(withRedux(configureStore)(BGApp));
