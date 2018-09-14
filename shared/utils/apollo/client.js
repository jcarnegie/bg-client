import * as log from 'loglevel';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import {
  filter,
  propEq,
  map,
  prop,
} from 'ramda';
import { localMutations } from './index';
import { clientState } from './clientstate';

if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch'); /* eslint-disable-line no-unused-vars */
}

export const uri = () => {
  if (process.env.DEPLOYED_ENV === 'local') {
    return process.browser ? 'http://127.0.0.1:5000/api/' : process.env.API_URL;
  }  
  return process.browser ? '/api/' : (process.env.API_URL || 'http://api:7000/api/');
}

let apolloClient = null;

const create = (initialState, { getToken }) => {
  const onErrorHandler = ({ graphQLErrors, networkError }) => {
    if (networkError) log.info(`[Network error]: ${networkError}`);
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => (
        log.info(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
      );
      const dupErrors = filter(propEq('name', 'UniqueConstraintError'), graphQLErrors);
      const validationMessages = map(err => ({ ...err, __typename: 'ValidationMessage' }), map(prop('data'), dupErrors));
      client.mutate({ mutation: localMutations.validationAddAll, variables: { validationMessages } });
    }
    return null;
  };

  const request = async operation => {
    const accessToken = getToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    operation.setContext({ headers });
  };

  const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
  );

  const httpLink = new HttpLink({
    uri: uri(),
    credentials: 'same-origin',
  });

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(onErrorHandler),
      requestLink,
      withClientState(clientState),
      httpLink,
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return client;
};

export const initApollo = (initialState, options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};
