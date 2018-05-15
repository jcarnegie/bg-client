import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export default {
  mode: process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  entry: {
    client: ["@babel/polyfill", "react-hot-loader/patch", "webpack-hot-middleware/client", "./client/client"]
  },
  output: {
    path: path.join(__dirname, "..", "..", "build", "bundle"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].js",
    publicPath: "/bundle/"
  },
  resolve: {
    extensions: [".json", ".jsx", ".js"],
    modules: [
      "node_modules"
    ],
    alias: {
      "@": path.resolve(__dirname, "../../client")
    }
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      }, {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "less-loader",
        options: {
          sourceMap: true
        }
      }]
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
                modules: false,
                targets: {
                  browsers: ["last 2 versions"]
                }
              }
            ]
          ],
          plugins: [
            "react-hot-loader/babel",
            "@babel/proposal-decorators",
            "@babel/proposal-class-properties",
            "@babel/proposal-function-bind",
            "@babel/proposal-object-rest-spread",
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
      "process.env.GOOGLE_ANALYTICS_TRACKING_ID": JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
      "process.env.MAINNET_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOKEN_CONTRACT_ADDR),
      "process.env.MAINNET_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOPUP_CONTRACT_ADDR),
      "process.env.MAINNET_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_ORACLE_CONTRACT_ADDR),
      "process.env.RINKEBY_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOKEN_CONTRACT_ADDR),
      "process.env.RINKEBY_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOPUP_CONTRACT_ADDR),
      "process.env.RINKEBY_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_ORACLE_CONTRACT_ADDR),
      "process.env.SENDBIRD_APP_ID": JSON.stringify(process.env.SENDBIRD_APP_ID)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: false,
    splitChunks: false
  }
};
