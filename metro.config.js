// metro.config.js
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, extraNodeModules},
  } = await getDefaultConfig();

  return {
    resolver: {
      // make sure .cjs files are picked up by Metro
      sourceExts: [...sourceExts, 'cjs'],
      // tell Metro to use our browserify polyfill whenever it sees "stream"
      extraNodeModules: {
        ...(extraNodeModules || {}),
        stream: require.resolve('stream-browserify'),
      },
    },
  };
})();
