import * as log from 'loglevel';
import bluebird from 'bluebird';
import App, { Container } from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import doSetCurrentWallet from '@/actions/setCurrentWallet';
import urlParse from 'url-parse';
import { Provider as IntlProvider, updateIntl } from 'react-intl-redux';
import { pathOr, path } from 'ramda';
import { ApolloProvider } from 'react-apollo';
import { setMobileDetect, mobileParser } from 'react-responsive-redux';

import withApollo from '@/shared/utils/apollo/withApollo';
import redirect from '@/shared/utils/redirect';
import BGReactGA from '@/client/utils/BGReactGA';
import configureStore from '@/client/utils/store';
import ResizeListener from '@/components/resizelistener';
import GlobalStyles from '@/components/GlobalStyles';
import GlobalLoadingScreen from '@/components/GlobalLoadingScreen';
import style from '@/shared/constants/style';
import { localization } from '@/shared/intl/setup';
import {
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';
import { createCrate } from '@/shared/utils/discord';
import {
  asyncGetNetworkId,
  web3IsInstalled,
  getWeb3Wallet,
  getBitGuildTokenContract,
  networkIdToName,
  networkIdIsSupported,
} from '@/shared/utils/network';
import { GlobalContext } from '@/shared/utils/context';
import { AUTH_ROUTES_REGEX, isWalletLinked } from '@/shared/utils';
import {
  APP_INIT,
  APP_RESIZE,
  APP_LAYOUT_SET_DEFAULTS,
  GA_CREATE,
  LAYOUT_MOBILE_MENU_SHOW,
} from '@/shared/constants/actions';
import doRefreshToken from '@/actions/refreshtoken';
import { accessTokenExpired, refreshTokenExpired } from '@/client/utils/tokens';

/* Poll web3 interface for user account with this frequency */
const WEB3_ACCOUNT_POLLING_INTERVAL = process.env.NODE_ENV === 'development' ? 1000 : 200;


if (process.env.DEPLOYED_ENV === 'production') {
  log.setDefaultLevel(log.levels.ERROR);
} else {
  log.setDefaultLevel(log.levels.INFO);
}

class BGApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const {
      apolloClient,
      isServer,
      me,
      store,
      req,
      pathname = '',
      query,
    } = ctx;
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    /* Route guards */
    const isPagePublic = !pathname.match(AUTH_ROUTES_REGEX);
    const hasSession = pathOr(false, ['id'], me);
    const hasAccessToken = pathOr(false, ['cookies', 'accessToken'], req);

    /* Server side: refreshToken is stored on localStorage on client only.
       We should always redirect to /refreshtoken page first to check for
       refreshToken
     */
    if (
      !process.browser &&
      hasAccessToken &&
      !hasSession &&
      pathname !== '/refreshtoken'
    ) {
      const redirectUrl = urlParse(pathname);
      redirectUrl.query = query;
      redirect(ctx, `/refreshtoken?pathname=${redirectUrl.toString()}`);
    }

    /*
      Client side: we may have an expired access token but a valid session/me object.
      In this case refresh, no matter if we're on a protected page or not.
    */
    if (!hasSession && !isPagePublic) {
      redirect(ctx, '/login');
    }

    if (process.browser) {
      log.info('accessTokenExpired(), refreshTokenExpired()', accessTokenExpired(), refreshTokenExpired());
      if (refreshTokenExpired() && !isPagePublic) {
        log.info('browser: refresh token expired and page not public --> /login');
        redirect(ctx, '/login');
      }

      if (accessTokenExpired() && !refreshTokenExpired()) {
        log.info('browser: access token exired, but have valid refresh token --> refresh tokens');
        await doRefreshToken({ apollo: apolloClient });
      }

      const web3Wallet = getWeb3Wallet();
      const isCurrentWalletLinked = me && isWalletLinked(web3Wallet, me);
      const isLoggedIn = me && path(['id'], me);
      const allowedPagesForUnlinkedWallet = ['/link', '/login', '/register'];
      const isPageAllowedForUnlinkedWallet = allowedPagesForUnlinkedWallet.indexOf(pathname) > -1;
      if (web3Wallet && isLoggedIn && !isCurrentWalletLinked && !isPageAllowedForUnlinkedWallet) {
        log.info('redirecting to link wallet page');
        redirect(ctx, '/link');
      }
    }

    /* Route guards end */

    let locals = {};
    let mobileDetect = {};
    if (isServer) {
      mobileDetect = mobileParser(req);
      store.dispatch(setMobileDetect(mobileDetect));
    }
    store.dispatch({ type: LAYOUT_MOBILE_MENU_SHOW, payload: { showMenu: false } });

    return { pageProps, locals, mobileDetect };
  }

  state = {
    web3Wallet: getWeb3Wallet(),
  }

  async getBalances() {
    const { apolloClient } = this.props;
    try {
      const wallet = getWeb3Wallet();
      const { data } = await apolloClient.query({
        query: localQueries.root,
      });
      const network = pathOr({}, ['network'], data);
      const balanceResponseETH = await bluebird.promisify(window.web3.eth.getBalance)(wallet);
      const balanceETH = window.web3.fromWei(balanceResponseETH, 'ether').toNumber();
      const balanceResponsePLAT = await bluebird.promisify(getBitGuildTokenContract(network).balanceOf)(wallet);
      const balancePLAT = window.web3.fromWei(balanceResponsePLAT, 'ether').toNumber();
      this.setState({ balanceETH, balancePLAT });
      return { balanceETH, balancePLAT };
    } catch (e) {
      return { balanceETH: 0, balancePLAT: 0 };
    }
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

  userWalletHasChanged(me) {
    return getWeb3Wallet() !== this.state.web3Wallet;
  }

  async networkChanged(currentNetworkId) {
    const { apolloClient } = this.props;
    const { data } = await apolloClient.query({
      query: localQueries.root,
    });
    const network = pathOr({}, ['network'], data);
    return !network.id || (parseInt(network.id, 10) !== parseInt(currentNetworkId, 10));
  }

  async handleWalletHasChanged({ me, web3Wallet, resetStore = true }) {
    const { apolloClient } = this.props;
    const isCurrentWalletLinked = me && isWalletLinked(web3Wallet, me);
    const isLoggedIn = me && me.id;
    await apolloClient.mutate({ mutation: localMutations.updateWallet, variables: { wallet: web3Wallet } });
    await ::this.getBalances();

    /* state.web3Wallet is null if user just logged in, should not trigger */
    if (web3Wallet && isLoggedIn && !isCurrentWalletLinked) {
      log.info('Redirecting to link wallet page');
      redirect({ pathname: window.location.pathname }, '/link');
    }

    if (isCurrentWalletLinked) {
      log.info('Calling setCurrentWallet mutation: ', web3Wallet);
      await doSetCurrentWallet({ apollo: apolloClient, wallet: web3Wallet, resetStore });
    }

    this.setState({
      web3Wallet,
      isCurrentWalletLinked,
    });
  }

  async handleNetworkChanged(currentNetworkId, web3Wallet) {
    const { apolloClient } = this.props;
    log.info('Network changed:', currentNetworkId);
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
      ::this.getBalances();
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
      log.info('Not logged in to metamask on route guarded page - redirecting to /login');
      redirect({ pathname: window.location.pathname }, '/login');
    }

    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const web3Wallet = getWeb3Wallet();
    if (this.userWalletHasChanged(me)) {
      await this.handleWalletHasChanged({ me, web3Wallet });
    }

    try {
      // const start = new Date();
      const currentNetworkId = await asyncGetNetworkId();
      // log.info(`Fetched network info in ${new Date().getTime() - start.getTime()} ms`);
      if (await this.networkChanged(currentNetworkId)) {
        await this.handleNetworkChanged(currentNetworkId, web3Wallet);
      }
    } catch (e) {
      log.error('Failed to get network:', e);
    }

    setTimeout(::this.networkAndWalletPoller, WEB3_ACCOUNT_POLLING_INTERVAL);
  }

  async componentDidUpdate() {
    this.handlePageStateUpdate();
  }

  async componentWillMount() {
    if (process.browser && web3IsInstalled()) {
      const meQuery = await this.props.apolloClient.query({ query: queries.me });
      const me = pathOr({}, ['data', 'me'], meQuery);
      await ::this.handleWalletHasChanged({ me, web3Wallet: getWeb3Wallet(), resetStore: false });
    }
    this.handlePageStateUpdate();
  }

  async handlePageStateUpdate() {
    const {
      apolloClient,
      mobileDetect,
      store,
    } = this.props;
    const meQuery = await apolloClient.query({ query: queries.me });
    const me = pathOr({}, ['data', 'me'], meQuery);
    const language = path(['language'], me);
    if (language) store.dispatch(updateIntl(localization[language]));
    store.dispatch({
      type: APP_LAYOUT_SET_DEFAULTS,
      payload: { type: mobileDetect },
    });
    if (!process.browser) return null;
    store.dispatch({ type: APP_RESIZE });
    const web3Wallet = getWeb3Wallet();
    const isCurrentWalletLinked = me && isWalletLinked(web3Wallet, me);

    if (!this.isPagePublic()) {
      /* Web3 install guard */
      if (!web3IsInstalled()) {
        return redirect({ pathname: window.location.pathname }, '/register');
      }
      /* MetaMask login guard */
      if (!web3Wallet) {
        return redirect({ pathname: window.location.pathname }, '/login');
      }
    }

    if (isCurrentWalletLinked !== this.state.isCurrentWalletLinked) {
      this.setState({ isCurrentWalletLinked });
    }

    if (web3Wallet !== this.state.web3Wallet) {
      await apolloClient.mutate({
        mutation: localMutations.updateWallet,
        variables: { wallet: web3Wallet },
      });
      const { balancePLAT, balanceETH } = await ::this.getBalances();
      this.setState({ balancePLAT, balanceETH });
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
      balancePLAT,
      balanceETH,
    } = this.state;

    const showGlobalLoadingScreen = ::this.isPagePublic() ? false : (!web3Wallet || !isCurrentWalletLinked);

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
            balancePLAT,
            balanceETH,
          }}
        >
          <ApolloProvider client={apolloClient}>
            <IntlProvider store={store}>
              <>
                <ResizeListener />
                <GlobalLoadingScreen show={showGlobalLoadingScreen} />
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
