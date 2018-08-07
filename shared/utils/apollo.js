import ApolloClient from 'apollo-boost';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as log from 'loglevel';

if (typeof global !== 'undefined') {
  global.fetch = require('node-fetch');
} else {
  const fetch = require('isomorphic-fetch');
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
    average: Int,
    fast: Int,
    fastest: Int,
  }

  type Mutation {
    updateNetwork(id: Int!, available: Boolean!, name: String!, supported: Boolean!) Network
    updateGas(average: Int!, fast: Int!, fastest: Int!) Gas
  }

  type Query {
    wallet: String
    network: [Network]
    gas: Gas
  }
`;

export const client = new ApolloClient({
  uri,
  clientState: {
    defaults: {
      wallet: null,
      network: {
        id: null,
        name: null,
        supported: null,
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
        updateNetwork: async (_, variables, { cache, getCacheKey }) => {
          log.info(`Setting network to ${variables.name} with id ${variables.id}.`);
          await cache.writeData({
            data: {
              network: {
                ...variables,
                __typename: 'Network',
              },
            },
          });
          const gasStationResponse = await fetch(ETH_GAS_STATION_ENDPOINT).then(res => res.json());
          log.info(`Fetched gas from ${ETH_GAS_STATION_ENDPOINT}`);
          await cache.writeData({
            data: {
              gas: {
                average: toGwei(gasStationResponse.average),
                fast: toGwei(gasStationResponse.fast),
                fastest: toGwei(gasStationResponse.fastest),
                __typename: 'Gas',
              },
            },
          });
          return null;
        },
      },
    },
    typeDefs,
  },
});

export const mutations = {
  updateNetwork: gql`
    mutation updateNetwork($id: Int!, $available: Boolean!, $name: String!, $supported: Boolean!) {
      updateNetwork(id: $id, available: $available, name: $name, supported: $supported) @client
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
};

export const queries = {
  listItems: gql`
    query listItems($userId: ID!, $language: String!) {
      listItems(userId: $userId, language: $language) {
        id presale lan tokenId image name description attrs saleExpiration salePrice saleState lastOwner {id} categories game { id }
      }
    }
  `,
  listGames: gql`{ listGames { id name slug url stagingUrl api nft itemsForSaleCount listed } }`,
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
    query listMarketplaceItems($language: String, $userId: Int, $gameId: Int!, $categories: [String], $sort: Value) {
      listMarketplaceItems(language: $language, userId: $userId, gameId: $gameId, categories: $categories, sort: $sort) {
        id lan tokenId name description image attrs categories salePrice saleExpiration saleState lastOwner {id} saleExpiration saleCurrency game {id} user {id}
      }
    }
  `,
};

export const localQueries = {
  root: gql`{
    network @client {
      id name supported
    }
    wallet @client
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
      id name supported
    }
  }`,
}

export const viewUserByWalletQuery = graphql(queries.viewUserByWallet, {
  name: 'user',
  options: props => {
    log.trace('Running viewUserByWalletQuery with props: ', props);
    return ({
      variables: { wallet: typeof window !== 'undefined' && window.web3 && (window.web3.eth.accounts[0] || null) },
      ssr: false,
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
