import gql from 'graphql-tag';

export const marketplaceQuery = gql`
    query marketplaceQuery($language: String!, $gameId: Int, $categories: [String], $andNotCategories: [String], $sort: Value) {
      listGames {
        id name slug url stagingUrl api nft itemsForSaleCount enabled comingSoon
        bannerImage thumbnailImage categoryIcon config
      }
      listMarketplaceItems(language: $language, gameId: $gameId, categories: $categories, andNotCategories: $andNotCategories, sort: $sort) {
         id lan tokenId name description image attrs categories salePrice saleExpiration saleState lastOwner {id} saleExpiration saleCurrency game {id} user {id} wallet
      }
    }
  `;
