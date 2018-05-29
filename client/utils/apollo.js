import ApolloClient from "apollo-boost";

if (typeof global !== "undefined") {
  global.fetch = require("node-fetch");
}

const uri = (process.env.NODE_ENV === "development" ? "http://localhost:7000" : "") + "/api";
export const client = new ApolloClient({uri});
