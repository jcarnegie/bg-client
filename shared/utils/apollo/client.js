import * as log from 'loglevel';
import bluebird from 'bluebird';
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
import {
  web3IsInstalled,
  networkIsSupported,
  getOracleContract,
  getBitGuildTokenContract,
} from '@/shared/utils/network';
import { localMutations, localQueries } from './index';

if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch'); /* eslint-disable-line no-unused-vars */
}

export const uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : '') + '/api/';

const typeDefs = `
  type Network {
    id: Int
    available: Boolean
    name: String
    supported: Boolean
  }

  type Gas {
    average: Int
    fast: Int
    fastest: Int
  }

  type Gift {
    tx: String
  }

  type ValidationMessage {
    name: String
    reason: String
  }

  type Mutation {
    updateNetworkAndWallet(id: Int!, available: Boolean!, name: String!, supported: Boolean!, wallet: String) Network
    updateGas(average: Int!, fast: Int!, fastest: Int!) Gas
    updateLatestBlock(tx: String!) String
    toggleUserRegistrationWorkflow(on: Boolean) Boolean
    validationAddAll(validationMessages: [ValidationMessage]) Boolean
    removeValidation(name: String!) Boolean
  }

  type Query {
    wallet: String
    rate: Number
    gifts: [Gift]
    validationMessages: [ValidationMessage]
    latestBlock: String
    showUserRegistrationWorkflow: Boolean
    network: [Network]
    gas: Gas
    balanceETH: Number
    balancePLAT: Number
  }
`;

export const onErrorHandler = ({ graphQLErrors, networkError }) => {
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
  console.log('adding access token to request headers');
  const accessToken = localStorage.getItem('accessToken');
  operation.setContext({ headers: { Authorization: `Bearer ${accessToken}` } });
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
  uri,
  credentials: 'same-origin',
});

const clientState = {
  defaults: {
    wallet: null,
    rate: null,
    gifts: [],
    balanceETH: 0,
    balancePLAT: 0,
    latestBlock: '',
    validationMessages: [],
    showUserRegistrationWorkflow: false,
    network: {
      id: null,
      name: null,
      supported: null,
      available: null,
      __typename: 'Network',
    },
    gas: {
      average: 8,
      fast: 16,
      fastest: 30,
      __typename: 'Gas',
    },
  },
  resolvers: {
    Mutation: {
      updateLatestBlock: async(_, { tx }, { cache, getCacheKey }) => {
        if (!web3IsInstalled()) return null;
        await cache.writeData({ data: { latestBlock: tx } });
        const { gifts } = await cache.readQuery({ query: localQueries.gifts });
        const result = await Promise.all(gifts.map(gift =>
          // will return null while transaction is in process
          bluebird.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
        ));
        const hashes = result.filter(tx => tx).map(tx => tx.transactionHash);
        cache.writeData({
          data: {
            gifts: gifts.filter(gift => !hashes.includes(gift.tx)),
          },
        });
        return null;
      },
      updateNetworkAndWallet: async(_, { wallet, ...network }, { cache, getCacheKey }) => {
        log.info(`Setting network to ${network.name} with id ${network.id}. Wallet: ${wallet}`);

        if (!wallet) {
          try {
            log.info('Trying to manually invalidate user in apollo cache.');
            delete cache.data.data['User:1'];
          } catch (e) {
            log.error(e);
          }
        }

        let data = {
          network: {
            ...network,
            __typename: 'Network',
          },
          wallet: (wallet || null),
        };


        await cache.writeData({ data });


        // const gasStationResponse = await fetch(ETH_GAS_STATION_ENDPOINT).then(res => res.json());
        // log.info(`Fetched gas from ${ETH_GAS_STATION_ENDPOINT}`);
        // await cache.writeData({
        //   data: {
        //     gas: {
        //       average: toGwei(gasStationResponse.average),
        //       fast: toGwei(gasStationResponse.fast),
        //       fastest: toGwei(gasStationResponse.fastest),
        //       __typename: 'Gas',
        //     },
        //   },
        // });
        log.info(`Fetched rate from oracle contract on ${name} network.`);
        const ETHPrice = await bluebird.promisify(getOracleContract(network).ETHPrice)();
        const rate = window.web3.fromWei(ETHPrice, 'ether').toNumber();
        await cache.writeData({ data: { rate } });
        log.info(`Set rate to ${rate.toString()}.`);
        if (!web3IsInstalled()) return null;
        if (networkIsSupported(network)) {
          let balanceETH = 0;
          let balancePLAT = 0;
          if (wallet) {
            const balanceResponseETH = await bluebird.promisify(window.web3.eth.getBalance)(wallet);
            balanceETH = window.web3.fromWei(balanceResponseETH, 'ether').toNumber();
            const balanceResponsePLAT = await bluebird.promisify(getBitGuildTokenContract(network).balanceOf)(wallet);
            balancePLAT = window.web3.fromWei(balanceResponsePLAT, 'ether').toNumber();
          }
          await cache.writeData({ data: { balanceETH, balancePLAT } });
        }
        return null;
      },
      toggleUserRegistrationWorkflow: async(_, { on = null }, { cache, getCacheKey }) => {
        if (typeof on === 'boolean') {
          await cache.writeData({ data: { showUserRegistrationWorkflow: Boolean(on) } });
          return on;
        } else {
          const { showUserRegistrationWorkflow } = await cache.readQuery({ query: localQueries.root });
          await cache.writeData({ data: { showUserRegistrationWorkflow: !showUserRegistrationWorkflow } });
          return !showUserRegistrationWorkflow;
        }
      },
      validationAddAll: async(_, { validationMessages }, { cache, getCacheKey }) => {
        const data = await cache.readQuery({ query: localQueries.root });
        const allMsgs = data.validationMessages.concat(validationMessages);
        await cache.writeData({ data: { validationMessages: allMsgs } });
        return null;
      },
      removeValidation: async(_, { name }, { cache, getCacheKey }) => {
        const data = await cache.readQuery({ query: localQueries.root });
        const validationMessages = data.validationMessages.filter(msg => (msg.name !== name));
        await cache.writeData({ data: { validationMessages } });
        return null;
      },
      removeAllValidations: async(_, variables, { cache }) => {
        await cache.writeData({ data: { validationMessages: [] } });
        return null;
      },
    },
  },
  typeDefs,
};

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(onErrorHandler),
    requestLink,
    withClientState(clientState),
    httpLink,
  ]),
  cache: new InMemoryCache(),
});
