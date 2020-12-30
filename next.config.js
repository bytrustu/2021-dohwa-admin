const path = require('path');
const fs = require('fs');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, './src/assets/scss')],
  },
};

module.exports = withImages({
  exclude: path.resolve(__dirname, './src/assets/images'),
  webpack(config, options) {
    return config;
  },
});

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {
  };
}

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/assets/less/antd-custom.less'), 'utf8'),
);

module.exports = withSass({
  ...withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
      importLoaders: 0,
    },
    cssLoaderOptions: {
      importLoaders: 3,
      localIdentName: '[local]___[hash:base64:5]',
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];
        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
  }),
});
