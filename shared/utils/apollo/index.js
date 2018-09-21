import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as log from 'loglevel';
import {
  merge,
  pickAll,
  dissoc,
} from 'ramda';

import { getWeb3Wallet } from '@/shared/utils/network';
import { client } from '@/shared/utils/apollo/withApollo';

export { client } from '@/shared/utils/apollo/withApollo';

if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch'); /* eslint-disable-line no-unused-vars */
}

export const ETH_GAS_STATION_ENDPOINT = 'https://ethgasstation.info/json/ethgasAPI.json';
export const uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : '') + '/api/';

const toGwei = value => (Number(window.web3.toWei(value / 10, 'shannon')) + 1000000000); // gwei

export const mutations = {
  register: gql`
    mutation register($email: String!, $wallet: String!, $signature: String!, $nickName: String!, $language: String!) {
      register(email: $email, wallet: $wallet, signature: $signature, nickName: $nickName, language: $language) {
        user { id nickName language wallets }
        tokenData { accessToken refreshToken refreshExpiresAt accessExpiresAt }
      }
    }
  `,
  createSigningMessage: gql`
    mutation createSigningMessage($wallet: String!, $action: String) {
      createSigningMessage(wallet: $wallet, action: $action) {
        nonce
        signingMessage
      }
    }
  `,
  login: gql`
    mutation login($wallet: String!, $signature: String!) {
      login(wallet: $wallet, signature: $signature) {
        user { id nickName language wallets }
        tokenData { accessToken refreshToken refreshExpiresAt accessExpiresAt }
      }
    }
  `,
  linkWallet: gql`
    mutation linkWallet($wallet: String!, $signature: String!) {
      linkWallet(wallet: $wallet, signature: $signature) {
        user { id wallets lastWalletUsed }
        tokenData { accessToken refreshToken refreshExpiresAt accessExpiresAt }
      }
    }
  `,
  setCurrentWallet: gql`
    mutation setCurrentWallet($currentWallet: String) {
      setCurrentWallet(currentWallet: $currentWallet) {
        user { id nickName language wallets }
        tokenData { accessToken refreshToken refreshExpiresAt accessExpiresAt }
      }
    }
  `,
  refreshToken: gql`
    mutation refreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        accessToken refreshToken refreshExpiresAt accessExpiresAt
      }
    }
  `,
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
  updateUser: gql`
    mutation updateUser($id: ID!, $payload: UserUpdatePayload!) {
      updateUser(id: $id, payload: $payload) {
        user { id nickName language wallets }
        tokenData { accessToken refreshToken refreshExpiresAt accessExpiresAt }
      }
    }
  `,
};

export const queries = {
  me: gql`
    query me {
      me {
        id nickName language wallets lastWalletUsed
      }
    }
  `,
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
        id wallet nickName language wallets lastWalletUsed
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
  updateWallet: gql`
    mutation updateWallet($wallet: String) {
      updateWallet(wallet: $wallet) @client
    }
  `,
  updateUserBalances: gql`
    mutation updateUserBalances {
      updateUserBalances @client
    }
  `,
  updateNetwork: gql`
    mutation updateNetwork($id: Int!, $available: Boolean!, $name: String!, $supported: Boolean!) {
      updateNetwork(id: $id, available: $available, name: $name, supported: $supported) @client
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

export const updateUser = async(id, payload) => {
  const variables = { id, payload: dissoc('__typename', payload) };
  return client.mutate({
    mutation: mutations.updateUser,
    variables,
  });
};
