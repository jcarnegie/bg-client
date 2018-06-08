const webpack = require("webpack");
const path = require("path");

module.exports = {
	webpack: config => {
		config.plugins.push(
			new webpack.DefinePlugin({
				"process.env.PORT": JSON.stringify(process.env.PORT),
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				"process.env.GOOGLE_ANALYTICS_TRACKING_ID": JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID),
				"process.env.MAINNET_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOKEN_CONTRACT_ADDR),
				"process.env.MAINNET_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_TOPUP_CONTRACT_ADDR),
				"process.env.MAINNET_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.MAINNET_ORACLE_CONTRACT_ADDR),
				"process.env.RINKEBY_TOKEN_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOKEN_CONTRACT_ADDR),
				"process.env.RINKEBY_TOPUP_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_TOPUP_CONTRACT_ADDR),
				"process.env.RINKEBY_ORACLE_CONTRACT_ADDR": JSON.stringify(process.env.RINKEBY_ORACLE_CONTRACT_ADDR),
				"process.env.SENDBIRD_APP_ID": JSON.stringify(process.env.SENDBIRD_APP_ID),
			})
		);

		config.resolve.alias["@"] = path.resolve(__dirname);

		return config;
	},
};
