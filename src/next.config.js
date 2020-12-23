const path = require('path');
const withImages = require('next-images')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/scss')],
  },
}

module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/assets/images'),
  webpack(config, options) {
    return config
  }
})
