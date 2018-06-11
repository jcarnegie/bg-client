import App, {Container} from "next/app";
import React from "react";
import {Provider} from "react-intl-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import configureStore from "../client/utils/store";
import GAListener from "../components/common/galistener";
import MetaMask from "../components/common/metamask";
import Register from "../components/popups/register";

import GlobalStyles from "./globalstyles";

class BGApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const gaListenerProps = GAListener.getInitialProps(ctx);
    const metaMaskProps = MetaMask.getInitialProps(ctx);

    router.beforePopState(ctx => {
      GAListener.sendPageView(ctx.url);
      return true; /* To confirm pop state */
    });

    return {pageProps, metaMaskProps, gaListenerProps};
  }

  render() {
    const {
      Component,
      pageProps,
      metaMaskProps,
      gaListenerProps,
      store,
    } = this.props;

    return (
      <Container warnings={false}>
          <GlobalStyles />
          <Provider store={store}>
            <>
              <MetaMask {...metaMaskProps} />
              <Register />
              <GAListener {...gaListenerProps} />
              <Component {...pageProps} />
            </>
          </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({async: true})(BGApp));
