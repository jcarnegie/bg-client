/* eslint-disable no-console */
const express = require("express");
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Next = require("next");
const pathMatch = require("path-match");
const {parse} = require("url");

const dev = process.env.NODE_ENV !== "production";
const next = Next({dev});
const handle = next.getRequestHandler();

const cors = require("./server/routes/cors");
const pre = require("./server/routes/pre");
const responsive = require("./server/routes/responsive");

const route = pathMatch();


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
  app.use("/", express.static(path.join(__dirname, "./static")));
  app.use(pre);
  app.use(cors);
  app.use(responsive);

  app.get("/ping", (request, response) => {
    response.status(200).json({pong: true});
  });

  app.get("/favicon.png", (request, response) => {
    response.sendFile(path.join(__dirname, "./static/favicon.png"));
  });

  app.get("/game/:slug", (req, res) => {
    const params = route("/game/:slug")(parse(req.url).pathname);
    return next.render(req, res, "/game", {slug: params.slug});
  });

  app.get("/presale/:slug", (req, res) => {
    const params = route("/presale/:slug")(parse(req.url).pathname);
    return next.render(req, res, "/presale", {slug: params.slug});
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  app.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`Server ready on http://localhost:${process.env.PORT}`);
  });
});
