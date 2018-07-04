const webpack = require("webpack");
const path = require("path");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
/* eslint-disable-next-line no-unused-vars */
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer"); /* BundleAnalyzerPlugin must be in scope. */


module.exports = withBundleAnalyzer({
	webpack: config => {
		config.plugins.push(
			new webpack.DefinePlugin({
				"process.env.PORT": JSON.stringify(process.env.PORT),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				"process.env.DEPLOYED_ENV": JSON.stringify(process.env.DEPLOYED_ENV),
				"process.env.GOOGLE_ANALYTICS_TRACKING_ID": JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
				"process.env.MAINNET_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOKEN_CONTRACT_ADDR),
				"process.env.MAINNET_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOPUP_CONTRACT_ADDR),
				"process.env.MAINNET_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_ORACLE_CONTRACT_ADDR),
				"process.env.RINKEBY_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOKEN_CONTRACT_ADDR),
				"process.env.RINKEBY_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOPUP_CONTRACT_ADDR),
				"process.env.MAINNET_BITIZENS_IGO_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_BITIZENS_IGO_CONTRACT_ADDR),
				"process.env.RINKEBY_BITIZENS_IGO_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_BITIZENS_IGO_CONTRACT_ADDR),
        "process.env.SENDBIRD_APP_ID": JSON.stringify(process.env.SENDBIRD_APP_ID),
			})
		);

		config.resolve.alias["@"] = path.resolve(__dirname);

		return config;
	},
	analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "./analyzer-output/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "./analyzer-output/client.html",
    },
  },
});
