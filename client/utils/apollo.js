import ApolloClient from "apollo-boost";

if (typeof global !== "undefined") {
  global.fetch = require("node-fetch");
}

export const uri = (process.env.NODE_ENV === "development" ? `http://localhost:${process.env.PORT}` : "") + "/api/";

export const client = new ApolloClient({uri});
