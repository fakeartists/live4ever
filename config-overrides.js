module.exports = function override(config, env) {
  if (config.module) {
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.js$/,
      use: 'ify-loader'
    });
  }
  return config;
};
