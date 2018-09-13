export const typeDefs = `
  type Network {
    id: Int
    available: Boolean
    name: String
    supported: Boolean
  }

  type Gas {
    average: Int
    fast: Int
    fastest: Int
  }

  type Gift {
    tx: String
  }

  type ValidationMessage {
    name: String
    reason: String
  }

  type Mutation {
    updateNetworkAndWallet(id: Int!, available: Boolean!, name: String!, supported: Boolean!, wallet: String) Network
    updateGas(average: Int!, fast: Int!, fastest: Int!) Gas
    updateLatestBlock(tx: String!) String
    toggleUserRegistrationWorkflow(on: Boolean) Boolean
    validationAddAll(validationMessages: [ValidationMessage]) Boolean
    removeValidation(name: String!) Boolean
  }

  type Query {
    wallet: String
    rate: Number
    gifts: [Gift]
    validationMessages: [ValidationMessage]
    latestBlock: String
    showUserRegistrationWorkflow: Boolean
    network: [Network]
    gas: Gas
    balanceETH: Number
    balancePLAT: Number
  }
`;