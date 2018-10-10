import gql from 'graphql-tag';

export const sitelandingQuery = gql`
  query {
    listGames {
      id name slug url stagingUrl api nft itemsForSaleCount enabled comingSoon
      bannerImage thumbnailImage categoryIcon config
    }
    me {
      id nickName language wallets lastWalletUsed data
    }
  }`;
