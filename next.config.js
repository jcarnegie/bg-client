module.exports = {
  webpack: config => {
    config.stats = {
       warnings: false, /* Disable spread warning */
    };
    return config;
  },
  webpackDevServer: config => {
    config.devServer.stats.warnings = false; /* Disable spread warning */
    return config;
  },
};
