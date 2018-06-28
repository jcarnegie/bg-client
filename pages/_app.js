import App, {Container} from "next/app";
import React from "react";
import {Provider} from "react-intl-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import * as log from "loglevel";

import BGReactGA from "@/client/utils/react-ga";
import configureStore from "@/client/utils/store";

import ResizeListener from "@/components/resizelistener";
import MetaMask from "@/components/common/metamask";
import GlobalStyles from "@/pages/globalstyles";
import style from "@/shared/constants/style";
import {APP_INIT, GA_CREATE} from "@/shared/constants/actions";


if (process.env.NODE_ENV === "production") {
  log.setDefaultLevel(log.levels.ERROR);
} else {
  log.setDefaultLevel(log.levels.INFO);
}

class BGApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    const {isServer} = ctx;
    const state = ctx.store.getState();

    if (!isServer && state.analytics.ga.pageview) {
      state.analytics.ga.pageview(ctx.pathname);
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const metaMaskProps = MetaMask.WrappedComponent.getInitialProps(ctx);
    const locals = isServer ? ctx.res.locals : {};

    return {pageProps, metaMaskProps, locals};
  }

  componentDidMount() {
    this.props.store.dispatch({type: APP_INIT});
    this.props.store.dispatch({
      type: GA_CREATE,
      payload: new BGReactGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
    });
  }

  render() {
    const {
      Component,
      pageProps,
      metaMaskProps,
      store,
      locals,
    } = this.props;

    return (
      <Container>
        <GlobalStyles style={style} />
        <Provider store={store}>
          <>
            <ResizeListener />
            <MetaMask {...metaMaskProps} />
            <Component {...pageProps} {...locals} />
          </>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({async: true})(BGApp));
