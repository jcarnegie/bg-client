import App, {Container} from "next/app";
import React from "react";
import {Provider} from "react-intl-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import {
  ApolloProvider,
} from "react-apollo";

import {
  client,
} from "@/shared/utils/apollo";

import * as log from "loglevel";

import configureStore from "@/client/utils/store";

import ResizeListener from "@/components/resizelistener";
// import LoadingPage from "@/components/LoadingPage";
// import ErrorPage from "@/components/ErrorPage";
import Web3Modals from "@/components/popups/Web3Modals";
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
    const {isServer} = ctx;

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const web3ModalsProps = Web3Modals.WrappedComponent.getInitialProps(ctx);
    const locals = isServer ? ctx.res.locals : {};

    return {pageProps, web3ModalsProps, locals};
  }

  componentDidMount() {
    this.props.store.dispatch({type: APP_INIT});
    const state = this.props.store.getState();
    if (state.analytics.ga.pageview) {
      state.analytics.ga.pageview(window.location.pathname);
    }
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

export default withRedux(configureStore)(withReduxSaga({async: true})(BGApp));
