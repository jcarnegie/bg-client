/* eslint-disable no-console */
const express = require("express");
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const fileUpload = require("express-fileupload");
const dev = process.env.NODE_ENV !== "production";
const Next = require("next");
const pathMatch = require("path-match");
const next = Next({dev});
const handle = next.getRequestHandler();
const {parse} = require("url");

const cors = require("./server/routes/cors");

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
console.log("process.env.PORT: ", process.env.PORT);
console.log("process.env.RENDERING: ", process.env.RENDERING);
console.log("process.env.GOOGLE_ANALYTICS_TRACKING_ID: ", process.env.GOOGLE_ANALYTICS_TRACKING_ID);
console.log("process.env.MAINNET_TOKEN_CONTRACT_ADDR: ", process.env.MAINNET_TOKEN_CONTRACT_ADDR);
console.log("process.env.MAINNET_TOPUP_CONTRACT_ADDR: ", process.env.MAINNET_TOPUP_CONTRACT_ADDR);
console.log("process.env.MAINNET_ORACLE_CONTRACT_ADDR: ", process.env.MAINNET_ORACLE_CONTRACT_ADDR);
console.log("process.env.RINKEBY_TOKEN_CONTRACT_ADDR: ", process.env.RINKEBY_TOKEN_CONTRACT_ADDR);
console.log("process.env.RINKEBY_TOPUP_CONTRACT_ADDR: ", process.env.RINKEBY_TOPUP_CONTRACT_ADDR);
console.log("process.env.RINKEBY_ORACLE_CONTRACT_ADDR: ", process.env.RINKEBY_ORACLE_CONTRACT_ADDR);
console.log("process.env.SENDBIRD_APP_ID: ", process.env.SENDBIRD_APP_ID);


const PORT = process.env.PORT || 5000;

next.prepare().then(() => {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  }

  app.disable("x-powered-by");
  app.enable("trust proxy");

  // app.use(fileUpload());
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(morgan("tiny")); // "default", "short", "tiny", "dev"
  app.use(cors);


    // /sandbox component={SandBox} exact
    // NotFound

  // TODO - https://github.com/fridays/next-routes
  const route = pathMatch();

  app.get("/game/:_id", (req, res) => {
    const params = route("/game/:_id")(parse(req.url).pathname);
    return next.render(req, res, "/game", {params});
  });


  app.get("/ping", (request, response) => {
    response.status(200).json({pong: true});
  });

  app.get("/favicon.png", (request, response) => {
    response.sendFile(path.join(__dirname, "./static/favicon.png"));
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server ready on http://localhost:${PORT}`);
  });
});
