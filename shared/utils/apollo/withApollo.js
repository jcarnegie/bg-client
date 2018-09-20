import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import { pathOr } from 'ramda';
import * as log from 'loglevel';
import * as localStorage from '@/client/utils/localStorage';
import redirect from '@/shared/utils/redirect';
import { queries } from '@/shared/utils/apollo';
import { initApollo } from './client';
import { AUTH_ROUTES_REGEX } from '@/shared/utils';

export let client = null;

const parseCookies = (req, options = {}) => {
  let ckie = '';
  if (req) {
    ckie = pathOr('', ['headers', 'cookie'], req);
  } else {
    ckie = (typeof document !== 'undefined') ? document.cookie : '';
  }
  return cookie.parse(ckie, options);
};

const getToken = req => {
  if (process.browser) {
    return localStorage.getItem('accessToken');
  } else {
    return parseCookies(req).accessToken;
  }
};

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`
    static propTypes = { apolloState: PropTypes.object.isRequired }

    static async getInitialProps(ctx) {
      console.log('withApollo.getInitialProps');
      const { Component, router, ctx: { req, res } } = ctx;
      const apollo = initApollo({}, {
        getToken: () => getToken(req),
      });

      ctx.ctx.apolloClient = apollo;

      // get user
      const { data } = await apollo.query({ query: queries.me });
      const { me } = data;

      // route guard
      const pathname = pathOr('', ['url'], req);
      const isPagePublic = !pathname.match(AUTH_ROUTES_REGEX);
      const hasSession = pathOr(false, ['id'], me);
      const hasAccessToken = pathOr(false, ['cookies', 'accessToken'], req);

      if (!process.browser && !hasAccessToken && hasSession) {
        redirect(ctx.ctx, '/refreshtoken');
      }
      if (!hasSession && !isPagePublic) {
        redirect(ctx.ctx, '/login');
      }

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }
      appProps.me = me;

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          log.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();
      // console.log('apolloState from cache: ', apolloState);
      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      client = this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookies().token,
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
