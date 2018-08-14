import App, { Container } from 'next/app';
import React from 'react';
import { Provider as IntlProvider } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import * as log from 'loglevel';

import {
  ApolloProvider,
  Query,
} from 'react-apollo';

import {
  client,
  queries,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';

import {
  asyncGetNetworkId,
  web3IsInstalled,
  getWeb3Wallet,
  networkIdToName,
  networkIdIsSupported,
} from '@/shared/utils/network';


import configureStore from '@/client/utils/store';

import ResizeListener from '@/components/resizelistener';
import Web3Modals from '@/components/popups/Web3Modals';
import GlobalStyles from '@/components/GlobalStyles';
import style from '@/shared/constants/style';
import {
  APP_INIT,
  INIT_CHAT,
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
    const { isServer } = ctx;

    const rootData = await client.query({ query: localQueries.root });
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ rootData: rootData.data, ...ctx }) : {};
    const web3ModalsProps = Web3Modals.WrappedComponent.getInitialProps(ctx);
    const locals = isServer ? ctx.res.locals : {};

    return { pageProps, web3ModalsProps, locals };
  }

  state = {
    wallet: null,
  }

  componentDidMount() {
    this.props.store.dispatch({ type: APP_INIT });
    const state = this.props.store.getState();

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
          await client.mutate({
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

        const { data } = await client.query({ query: localQueries.root });
        const { network, wallet } = data;

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
          await client.mutate({
            mutation: localMutations.updateNetworkAndWallet,
            variables: {
              ...currentNetwork,
              wallet: currentWallet,
            },
          });
          this.props.store.dispatch({ type: INIT_CHAT });
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
    } = this.props;

    const {
      wallet,
    } = this.state;

    return (
      <Container>
        <GlobalStyles style={style} />
        <ApolloProvider client={client}>
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
              <Query
                skip={() => !wallet}
                query={queries.viewUserByWallet}
                variables={{ wallet }}
              >
                {() => <Component {...pageProps} {...locals} />}
              </Query>
            </>
          </IntlProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(BGApp));
