import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import * as log from "loglevel";

import {readFromQueryString} from "@/client/utils/location";

if (typeof global !== "undefined") {
  global.fetch = require("node-fetch");
}

export const uri = (process.env.NODE_ENV === "development" ? "http://localhost:7000" : "") + "/api/";

export const client = new ApolloClient({
  uri,
});


export const queries = {
  listItems: gql`
    query listItems($wallet: String!, $userId: ID!, $language: String!, $testItems: Boolean) {
      listItems(wallet: $wallet, userId: $userId, language: $language, testItems: $testItems) {
        id presale lan tokenId image name description attrs categories game { id }
      }
    }
  `,
  listGames: gql`{ listGames { id name slug url api nft contract } }`,
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
        id name slug url api nft contract
      }
    }
  `,
  listMarketplaceItems: gql`
    query listMarketplaceItems($language: String!, $userId: Int!, $gameId: Int!, $categories: [String], $sort: Value) {
      listMarketplaceItems(language: $language, userId: $userId, gameId: $gameId, categories: $categories, sort: $sort) {
        id lan tokenId name description image attrs categories saleState lastOwner {id} saleExpiration saleCurrency game {id} user {id}
      }
    }
  `,
};

export const viewUserByWalletQuery = graphql(queries.viewUserByWallet, {
  name: "user",
  options: props => {
    log.trace("Running viewUserByWalletQuery with props: ", props);
    return ({
      variables: {wallet: typeof window !== "undefined" && window.web3 && (window.web3.eth.accounts[0] || null)},
      ssr: false,
    });
  },
});

export const listGamesQuery = graphql(queries.listGames, {name: "games"});

export const listItemsQuery = graphql(queries.listItems, {
  name: "items",
  skip: props => (props.user && props.user.loading),
  options: props => {
    log.trace("Running listItemsQuery with props: ", props);
    const user = props.user.viewUserByWallet ? props.user.viewUserByWallet : props.user;
    return ({
      variables: {
        wallet: user.wallet,
        language: user.language,
        userId: user.id,
        testItems: (readFromQueryString("testItems") === "true"),
      },
    });
  },
});

export const viewGameBySlugQuery = graphql(queries.viewGameBySlug, {
  name: "game",
  skip: props => !props.slug,
  options: props => {
    log.trace("Running viewGameBySlugQuery with props: ", props);
    return ({
      variables: {
        slug: props.slug || (props.game && props.game.slug),
      },
    });
  },
});

export const listMarketplaceItemsQuery = graphql(queries.listMarketplaceItems, {
  name: "marketItems",
  skip: props => {
    return ((props.user && props.user.loading) || (props.games && props.games.loading));
  },
  options: props => {
    log.info("Running listMarketplaceItemsQuery with props: ", props);
    const user = props.user.viewUserByWallet ? props.user.viewUserByWallet : props.user;
    const games = props.games.listGames ? props.games.listGames : props.games;
    return ({
      variables: {
        language: user.language,
        userId: user.id,
        gameId: games[0].id,
        categories: [],
        sort: null
      },
    });
  },
});
