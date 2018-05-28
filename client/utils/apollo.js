import ApolloClient from "apollo-boost";

if (typeof global !== "undefined") {
  global.fetch = require("node-fetch");
}

const uri = "http://localhost:4000";
export const client = new ApolloClient({uri});
