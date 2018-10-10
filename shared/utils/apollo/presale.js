import gql from 'graphql-tag';

export const presaleQuery = gql`
  query {
    listUserPresaleTickets {
      id wallet setId
    }
     me {
       id nickName language wallets lastWalletUsed data
     }
  }
`;
