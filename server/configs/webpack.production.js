const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  entry: {
    client: ["./client/client"]
  },
  output: {
    path: path.join(__dirname, "..", "..", "build", "bundle"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].js",
    publicPath: "/bundle/"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    extensions: [".json", ".jsx", ".js"],
    modules: [
      "node_modules"
    ]
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "less-loader"
      ]
    }, {
      test: /\.(ttf|woff|woff2|eot|svg|gif|png|ico)(\?.+)?$/,
      use: [{
        loader: "file-loader?name=[name].[ext]?[hash]"
      }]
    }, {
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: [{
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            "@babel/react",
            [
              "@babel/env",
              {
                targets: {
                  browsers: ["last 2 versions"]
                }
              }
            ]
          ],
          plugins: [
            "@babel/proposal-decorators",
            "@babel/proposal-class-properties",
            "@babel/proposal-function-bind",
            "@babel/proposal-object-rest-spread",
            "@babel/transform-runtime",
            "lodash"
          ]
        }
      }]
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RENDERING": JSON.stringify(process.env.RENDERING),
      "process.env.MAINNET_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOKEN_CONTRACT_ADDR),
      "process.env.MAINNET_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOPUP_CONTRACT_ADDR),
      "process.env.MAINNET_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_ORACLE_CONTRACT_ADDR),
      "process.env.RINKEBY_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOKEN_CONTRACT_ADDR),
      "process.env.RINKEBY_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOPUP_CONTRACT_ADDR),
      "process.env.RINKEBY_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_ORACLE_CONTRACT_ADDR),
      "process.env.SENDBIRD_APP_ID": JSON.stringify(process.env.SENDBIRD_APP_ID)
    }),
    new ProgressBarPlugin()
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    splitChunks: false
  }
};
