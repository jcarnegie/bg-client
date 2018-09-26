import Cookies from 'js-cookie';
import gql from 'graphql-tag';
import { dissoc } from 'ramda';
import * as bgLocalStorage from '@/client/utils/localStorage';
import { storeTokenData } from '@/client/utils/tokens';
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
        user { id nickName language wallets lastWalletUsed }
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
        user { id nickName language wallets lastWalletUsed }
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
        user { id nickName language wallets lastWalletUsed }
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
  listUserPresaleTickets: gql`
    {
      listUserPresaleTickets {
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
  validationMessages: gql`{
    validationMessages @client {
      name reason
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


export const updateUser = async(id, payload) => {
  const variables = { id, payload: dissoc('__typename', payload) };
  return client.mutate({
    mutation: mutations.updateUser,
    variables,
  });
};

export const updateTokensAndMe = async(apollo, tokenData, user) => {
  // store tokens in localStorage and accessToken in cookie
  storeTokenData(tokenData);
  Cookies.set('accessToken', tokenData.accessToken);

  // update me query in apollo cache
  await apollo.writeQuery({
    query: queries.me,
    data: { me: { ...user } },
  });
};
