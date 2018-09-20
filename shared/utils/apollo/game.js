import gql from 'graphql-tag';

export const gameQuery = gql`
    query gameQuery($slug: String!) {
      viewGameBySlug(slug: $slug) {
        id name slug url stagingUrl api nft
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
    }
  `;
