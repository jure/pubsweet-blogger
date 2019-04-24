const path = require('path')

module.exports = [
  // include app folder
  path.join(__dirname, '..', 'app'),
  // include pubsweet packages which are published untranspiled
  /pubsweet-[^/\\]+\/(?!node_modules)/,
  /@pubsweet\/[^/\\]+\/(?!node_modules)/,
  // include other packages when this repo is mounted in a workspace
  /components\/client\/[^/\\]+\/(?!node_modules)/,
  /packages\/[^/\\]+\/(?!node_modules)/,
  /node_modules\/xpub-edit/,
]
