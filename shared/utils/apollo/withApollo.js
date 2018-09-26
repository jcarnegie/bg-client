import React from 'react';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import * as log from 'loglevel';
import { queries } from '@/shared/utils/apollo';
import { initApollo } from './client';
import { getToken } from '@/shared/utils/cookies';

export let client = null;

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`
    static propTypes = { apolloState: PropTypes.object.isRequired }

    static async getInitialProps(ctx) {
      log.info('withApollo.getInitialProps');
      const { Component, router, ctx: { req, res } } = ctx;
      const apollo = initApollo({}, {
        getToken: () => getToken(req),
      });

      ctx.ctx.apolloClient = apollo;

      // get user
      const { data } = await apollo.query({ query: queries.me });
      const { me } = data;
      ctx.ctx.me = me;

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
      client = this.apolloClient = initApollo(props.apolloState, { getToken });
    }

    render() {
      if (process.browser) {
        log.info(`Time to first render: ${new Date().getTime() - window._$start.getTime()} ms`);
      }
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
