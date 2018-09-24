import gql from 'graphql-tag';

export const presaleQuery = gql`
  query {
    listUserPresaleTickets {
      id wallet setId
    }
  }
`;
