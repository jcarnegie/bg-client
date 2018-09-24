import App, { Container } from 'next/app';
import React from 'react';
import { Provider as IntlProvider, updateIntl } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import * as log from 'loglevel';
import { contains, pathOr, path } from 'ramda';

import {
  ApolloProvider,
} from 'react-apollo';

import { setMobileDetect, mobileParser } from 'react-responsive-redux';
import { localization } from '@/shared/intl/setup';
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

import style from '@/shared/constants/style';
import {
  APP_INIT,
  APP_RESIZE,
  APP_LAYOUT_SET_DEFAULTS,
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
    let mobileDetect = {};
    if (isServer) {
      const { req } = ctx;
      mobileDetect = mobileParser(req);
      store.dispatch(setMobileDetect(mobileDetect));
    }
    return { pageProps, locals, mobileDetect };
  }

  state = {
    web3Wallet: getWeb3Wallet(),
  }

  metamaskLoggedIn() {
    if (!web3IsInstalled()) return false;
    return window.web3.eth.accounts[0];
  }

  hasSession(me) {
    return me.id;
  }

  isPagePublic() {
    const { router } = this.props;
    return !router.pathname.match(AUTH_ROUTES_REGEX);
  }

  userWalletHasChanged() {
    return getWeb3Wallet() !== this.state.web3Wallet;
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
    const isCurrentWalletLinked = me && this.isWalletLinked(me, web3Wallet);
    log.info('calling updateUserBalances mutation');
    await apolloClient.mutate({ mutation: localMutations.updateWallet, variables: { wallet: web3Wallet } });
    await apolloClient.mutate({ mutation: localMutations.updateUserBalances });
    if (this.hasSession(me)) {
      if (!isCurrentWalletLinked) {
        log.info('redirecting to link wallet page');
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

    if (!this.metamaskLoggedIn() && !this.isPagePublic()) {
      log.info('not logged in to metamask on route guarded page - redirecting to /login');
      redirect({}, '/login');
    }

    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const web3Wallet = getWeb3Wallet();
    if (this.userWalletHasChanged(me)) {
      await this.handleWalletHasChanged(me, web3Wallet);
    }

    try {
      const currentNetworkId = await asyncGetNetworkId();
      if (await this.networkChanged(currentNetworkId)) {
        await this.handleNetworkChanged(currentNetworkId, web3Wallet);
      }
    } catch (e) {
      log.error('Failed to get network:', e);
    }

    setTimeout(::this.networkAndWalletPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
  }

  async componentWillMount() {
    const {
      apolloClient,
      mobileDetect,
      router,
      store,
    } = this.props;
    const { pathname } = router;
    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const language = path(['language'], me);
    if (language) store.dispatch(updateIntl(localization[language]));
    store.dispatch({
      type: APP_LAYOUT_SET_DEFAULTS,
      payload: { type: mobileDetect },
    });
    if (!process.browser) return null;
    this.props.store.dispatch({ type: APP_RESIZE });
    const web3Wallet = getWeb3Wallet();
    const isLoggedIn = web3Wallet && this.hasSession(me);

    /* Redirect to landing page if user is already logged in but on login or register page */
    if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
      redirect({}, '/');
    }

    /* Link wallets page route guard */
    if (pathname === '/link') {
      if (!isLoggedIn) {
        /* User not logged in, cannot link, redirect to login */
        redirect({}, '/login');
      }
      if (isLoggedIn && !this.userWalletHasChanged(me)) {
        /* User wallet has not changed, nothing to link, redirect to landing page */
        redirect({}, '/');
      }
    }

    if (!this.isPagePublic()) {
      /* Web3 install guard */
      if (!web3IsInstalled()) {
        return Router.push({ pathname: '/register', query: { pathname } }, '/register');
      }
      /* MetaMask login guard */
      if (!web3Wallet) {
        return Router.push({ pathname: '/login', query: { pathname } }, '/login');
      }
    }

    const wallets = pathOr([], ['wallets'], me);

    this.setState({ isCurrentWalletLinked: contains(web3Wallet, wallets) });

    if (web3Wallet) {
      await apolloClient.mutate({
        mutation: localMutations.updateWallet,
        variables: { wallet: web3Wallet },
      });
      await apolloClient.mutate({ mutation: localMutations.updateUserBalances });
    }
  }

  async componentDidMount() {
    const { store } = this.props;
    store.dispatch({ type: APP_INIT });
    const state = store.getState();
    const { apolloClient } = this.props;
    /* Bootstrap Google Analytics */
    store.dispatch({
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

      setTimeout(::this.networkAndWalletPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
    } else {
      /* Set defaults for no network */
      const currentNetwork = {
        id: 1,
        name: 'main',
        supported: false,
        available: false,
      };
      await apolloClient.mutate({
        mutation: localMutations.updateNetwork,
        variables: {
          ...currentNetwork,
        },
      });
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
