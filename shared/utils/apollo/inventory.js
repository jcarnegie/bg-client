import gql from 'graphql-tag';

export const inventoryQuery = gql`
    query inventoryQuery($userId: ID!, $language: String!, $slug: String!) {
      listGames {
        id name slug url stagingUrl api nft itemsForSaleCount enabled comingSoon
        bannerImage thumbnailImage categoryIcon config
      }
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
      listItems(userId: $userId, language: $language) {
        id presale lan tokenId image name description attrs saleExpiration salePrice saleState lastOwner {id} categories game { id }
      }
      viewGameBySlug(slug: $slug) {
        id name slug url stagingUrl api nft
      }
    }
  `;
