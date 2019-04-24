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
    mode: 'production',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['./app'],
    },
    output: {
      path: outputPath,
      filename: '[name].[hash].js',
      publicPath: '/assets/',
    },
    module: {
      rules,
    },
    resolve: {
      alias: {
        joi: 'joi-browser',
        config: clientConfigPath,
      },
      extensions: ['.js', '.jsx', '.json', '.scss'],
    },
    plugins: plugins({
      hmr: false,
      html: true,
      extractText: true,
      optimize: true,
      env: 'production',
    }),
    node: {
      fs: 'empty',
      __dirname: true,
    },
  },
]
