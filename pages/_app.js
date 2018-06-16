import App, {Container} from "next/app";
import React from "react";
import {Provider} from "react-intl-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import * as log from "loglevel";

import configureStore from "@/client/utils/store";

import GAListener from "@/components/common/galistener";
import MetaMask from "@/components/common/metamask";

import GlobalStyles from "@/pages/globalstyles";
import style from "@/shared/constants/style";
import {APP_INIT} from "@/shared/constants/actions";


if (process.env.NODE_ENV === "production") {
  log.setDefaultLevel(log.levels.ERROR);
} else {
  log.setDefaultLevel(log.levels.INFO);
}

class BGApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const gaListenerProps = GAListener.getInitialProps(ctx);
    const metaMaskProps = MetaMask.WrappedComponent.getInitialProps(ctx);

    const locals = ctx.isServer ? ctx.res.locals : {};

    return {pageProps, metaMaskProps, gaListenerProps, locals};
  }

  componentDidMount() {
    this.props.store.dispatch({type: APP_INIT});
  }

  render() {
    const {
      Component,
      pageProps,
      metaMaskProps,
      gaListenerProps,
      store,
      locals,
    } = this.props;

    return (
      <Container warnings={false}>
        <GlobalStyles style={style} />
        <Provider store={store}>
          <>
            <MetaMask {...metaMaskProps} />
            <GAListener {...gaListenerProps} />
            <Component {...pageProps} {...locals} />
          </>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({async: true})(BGApp));
