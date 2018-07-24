import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-intl-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import gql from 'graphql-tag';
import * as log from 'loglevel';

import {
  ApolloProvider,
} from 'react-apollo';

import {
  client,
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
import { APP_INIT } from '@/shared/constants/actions';

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

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const web3ModalsProps = Web3Modals.WrappedComponent.getInitialProps(ctx);
    const locals = isServer ? ctx.res.locals : {};

    return { pageProps, web3ModalsProps, locals };
  }

  componentDidMount() {
    this.props.store.dispatch({ type: APP_INIT });
    const state = this.props.store.getState();

    if (state.analytics.ga.pageview) {
      state.analytics.ga.pageview(window.location.pathname);
    }

    this.setState({
      interval: window.setInterval(async() => {
        if (!web3IsInstalled()) return;

        const rootLocalQuery = gql`{
          network @client {
            id name supported
          }
          wallet @client
        }`;

        const { data } = await client.query({ query: rootLocalQuery });
        const { network, wallet } = data;

        const currentNetworkId = await asyncGetNetworkId();
        const currentWallet = getWeb3Wallet();

        /* Network has changed */
        if (!network.id || (network.id !== currentNetworkId)) {
          await client.writeData({
            data: {
              network: {
                id: currentNetworkId,
                name: networkIdToName(currentNetworkId),
                supported: networkIdIsSupported(currentNetworkId),
                __typename: 'Network',
              },
            },
          });
        }

        /* Wallet has changed */
        if (!wallet || wallet !== currentWallet) {
          await client.writeData({
            data: {
              wallet: currentWallet,
            },
          });
        }

        log.info('network: ', network, 'wallet: ', wallet);
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

    return (
      <Container>
        <GlobalStyles style={style} />
        <ApolloProvider client={client}>
          <Provider store={store}>
            <>
              <ResizeListener />
              <Web3Modals {...web3ModalsProps} />
              <Component {...pageProps} {...locals} />
            </>
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(BGApp));
