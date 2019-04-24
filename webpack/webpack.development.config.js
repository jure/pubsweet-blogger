const path = require('path')
const fs = require('fs-extra')
const config = require('config')
const { pick } = require('lodash')
const rules = require('./common-rules')

const outputPath = path.resolve(__dirname, '..', '_build', 'assets')

// can't use node-config in webpack so save whitelisted client config into the build and alias it below
const clientConfig = pick(config, config.publicKeys)
fs.ensureDirSync(outputPath)
const clientConfigPath = path.join(outputPath, 'client-config.json')
fs.writeJsonSync(clientConfigPath, clientConfig, { spaces: 2 })

const plugins = require('./plugins')

module.exports = [
  {
    // The configuration for the client
    name: 'app',
    target: 'web',
    mode: 'development',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app'],
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      publicPath: '/assets/',
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules,
    },
    resolve: {
      alias: {
        joi: 'joi-browser',
        config: clientConfigPath,
      },
      extensions: ['.js', '.jsx', '.json', '.scss'],
      enforceExtension: false,
    },
    plugins: plugins({
      hmr: true,
      html: false,
      noEmitOnErrors: true,
      extractText: false,
      optimize: true,
      env: 'development',
    }),
    node: {
      fs: 'empty',
      __dirname: true,
    },
  },
]
