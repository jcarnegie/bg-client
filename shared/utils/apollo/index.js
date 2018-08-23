import ApolloBoostClient from 'apollo-boost';
import bluebird from 'bluebird';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as log from 'loglevel';
import {
  merge,
  pickAll,
  dissoc,
  filter,
  propEq,
  map,
  prop,
} from 'ramda';

import {
  web3IsInstalled,
  getWeb3Wallet,
  networkIsSupported,
  getOracleContract,
  getBitGuildTokenContract,
} from '@/shared/utils/network';


if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch'); /* eslint-disable-line no-unused-vars */
}

export const ETH_GAS_STATION_ENDPOINT = 'https://ethgasstation.info/json/ethgasAPI.json';
export const uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : '') + '/api/';

const toGwei = value => (Number(window.web3.toWei(value / 10, 'shannon')) + 1000000000); // gwei

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

export const mutations = {
  listItemForSale: gql`
    mutation listItemForSale ($userId: Int!, $itemId: Int!, $saleListingId: Int!, $saleTxnHash: String!, $salePrice: Int!) {
      listItemForSale(userId: $userId, itemId: $itemId, saleListingId: $saleListingId, saleTxnHash: $saleTxnHash, salePrice: $salePrice) {
        id
      }
    }
  `,
  purchaseItem: gql`
    mutation purchaseItem ($userId: Int!, $itemId: Int!, $salePurchaseTxnHash: String!) {
      purchaseItem(userId: $userId, itemId: $itemId, salePurchaseTxnHash: $salePurchaseTxnHash) {
        id
      }
    }
  `,
  extendItemForSale: gql`
    mutation extendItemForSale ($itemId: Int!, $saleExtendTxnHash: String!) {
      extendItemForSale(itemId: $itemId, saleExtendTxnHash: $saleExtendTxnHash) {
        id
      }
    }
  `,
  withdrawItemFromSale: gql`
    mutation withdrawItemFromSale ($itemId: Int!, $saleWithdrawTxnHash: String!) {
      withdrawItemFromSale(itemId: $itemId, saleWithdrawTxnHash: $saleWithdrawTxnHash) {
        id
      }
    }
  `,
  createUser: gql`
    mutation createUser($payload: UserCreatePayload!) {
      createUser(payload: $payload) {
        id wallet nickName email language
      }
    }
  `,
  updateUser: gql`
    mutation updateUser($id: ID!, $payload: UserUpdatePayload!) {
      updateUser(id: $id, payload: $payload) {
        id wallet nickName email language
      }
    }
  `,
};

export const queries = {
  listItems: gql`
    query listItems($userId: ID!, $language: String!) {
      listItems(userId: $userId, language: $language) {
        id presale lan tokenId image name description attrs saleExpiration salePrice saleState lastOwner {id} categories game { id }
      }
    }
  `,
  listGames: gql`{
    listGames {
      id name slug url stagingUrl api nft itemsForSaleCount enabled comingSoon
      bannerImage thumbnailImage categoryIcon config
    }
  }`,
  viewUserByWallet: gql`
    query viewUserByWallet($wallet: String!) {
      viewUserByWallet(wallet: $wallet) {
        id wallet nickName email language
      }
    }
  `,
  viewGameBySlug: gql`
    query viewGameBySlug($slug: String!) {
      viewGameBySlug(slug: $slug) {
        id name slug url stagingUrl api nft
      }
    }
  `,
  listMarketplaceItems: gql`
      query listMarketplaceItems($language: String, $userId: Int, $gameId: Int, $categories: [String], $andNotCategories: [String], $sort: Value) {
        listMarketplaceItems(language: $language, userId: $userId, gameId: $gameId, categories: $categories, andNotCategories: $andNotCategories, sort: $sort) {
        id lan tokenId name description image attrs categories salePrice saleExpiration saleState lastOwner {id} saleExpiration saleCurrency game {id} user {id}
      }
    }
  `,
  listUserPresaleTickets: gql`
    query listUserPresaleTickets($wallet: String!, $userId: ID!) {
      listUserPresaleTickets(wallet: $wallet, userId: $userId) {
        id wallet setId
      }
    }
  `,
};

export const localQueries = {
  root: gql`{
    wallet @client
    rate @client
    balanceETH @client
    balancePLAT @client
    latestBlock @client
    validationMessages @client {
      name reason
    }
    gifts @client
    showUserRegistrationWorkflow @client
    network @client {
      id name supported available
    }
    gas @client {
      average fast fastest
    }
  }`,
  gas: gql`{
    gas @client {
      average fast fastest
    }
  }`,
  network: gql`{
    network @client {
      id name supported available
    }
  }`,
  wallet: gql`{
    wallet @client
  }`,
  balances: gql`{
    balanceETH @client
    balancePLAT @client
  }`,
  gifts: gql`{
    gifts @client
  }`,
};

export const localMutations = {
  updateNetworkAndWallet: gql`
    mutation updateNetworkAndWallet($id: Int!, $available: Boolean!, $name: String!, $supported: Boolean!, $wallet: String) {
      updateNetworkAndWallet(id: $id, available: $available, name: $name, supported: $supported, wallet: $wallet) @client
    }
  `,
  updateLatestBlock: gql`
    mutation updateLatestBlock($tx: String!) {
      updateLatestBlock(tx: $tx) @client
    }
  `,
  toggleUserRegistrationWorkflow: gql`
    mutation toggleUserRegistrationWorkflow($on: Boolean!) {
      toggleUserRegistrationWorkflow(on: $on) @client
    }
  `,
  validationAddAll: gql`
    mutation validationAddAll($validationMessages: [ValidationMessage]!) {
      validationAddAll(validationMessages: $validationMessages) @client
    }
  `,
  removeValidation: gql`
    mutation removeValidation($name: String!) {
      removeValidation(name: $name) @client
    }
  `,
   removeAllValidations: gql`
    mutation removeAllValidations {
      removeAllValidations @client
    }
  `,
};

const onError = ({ graphQLErrors, networkError }) => {
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

export const createApolloClient = () => new ApolloBoostClient({
  uri,
  onError,
  clientState: {
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
  },
});

export const client = createApolloClient();

export const viewUserByWalletQuery = graphql(queries.viewUserByWallet, {
  name: 'user',
  options: props => {
    log.trace('Running viewUserByWalletQuery with props: ', props);
    return ({
      variables: { wallet: typeof window !== 'undefined' && window.web3 && (window.web3.eth.accounts[0] || null) },
      ssr: false,
      fetchPolicy: 'no-cache',
    });
  },
});

export const listGamesQuery = graphql(queries.listGames, { name: 'games' });

export const listItemsQuery = graphql(queries.listItems, {
  name: 'items',
  skip: props => (props.user && props.user.loading),
  options: props => {
    log.trace('Running listItemsQuery with props: ', props);
    const user = props.user.viewUserByWallet ? props.user.viewUserByWallet : props.user;
    return ({
      variables: {
        language: user.language,
        userId: user.id,
      },
      pollInterval: 30000,
    });
  },
});

export const viewGameBySlugQuery = graphql(queries.viewGameBySlug, {
  name: 'game',
  skip: props => !props.slug,
  options: props => {
    log.trace('Running viewGameBySlugQuery with props: ', props);
    return ({
      variables: {
        slug: props.slug || (props.game && props.game.slug),
      },
    });
  },
});

export const listMarketplaceItemsQuery = graphql(queries.listMarketplaceItems, {
  name: 'marketItems',
  skip: props => {
    return (
      !props.user || !props.games ||
      (props.user && props.user.loading) || (props.games && props.games.loading)
    );
  },
  options: props => {
    log.info('Running listMarketplaceItemsQuery with props: ', props);
    const user = props.user.viewUserByWallet ? props.user.viewUserByWallet : props.user;
    const games = props.games.listGames ? props.games.listGames : props.games;

    return ({
      variables: {
        language: 'en',
        userId: user.id,
        gameId: games[0].id,
        categories: [],
        sort: null,
      },
    });
  },
});

export const createUser = async(locale, data) => {
  const newUser = merge(data, { language: locale });
  const userFields = ['wallet', 'email', 'nickName', 'language'];
  const variables = { payload: pickAll(userFields, newUser) };
  return client.mutate({ mutation: mutations.createUser, variables });
};


export const updateUser = async(user, newUser) => {
  const { data } = await client.query({ query: queries.viewUserByWallet, variables: { wallet: getWeb3Wallet() } });
  const { viewUserByWallet } = data;
  const variables = { id: viewUserByWallet.id, payload: dissoc('__typename', merge(viewUserByWallet, newUser)) };
  return client.mutate({
    mutation: mutations.updateUser,
    variables,
  });
};
