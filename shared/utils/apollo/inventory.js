import gql from 'graphql-tag';

export const inventoryQuery = gql`
   {
      listGames {
        id name slug url stagingUrl api nft itemsForSaleCount enabled comingSoon
        bannerImage thumbnailImage categoryIcon config
      }
      listItems {
        id presale lan tokenId image name description attrs saleExpiration salePrice saleState lastOwner {id} categories game { id }
      }
    }
  `;
