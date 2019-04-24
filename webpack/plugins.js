const path = require('path')
const config = require('config')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (opts = {}) => {
  const plugins = []

  if (opts.hmr) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (opts.html) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: 'PubSweet app',
        template: '../app/index.ejs', // Load a custom template
        inject: 'body', // Inject all scripts into the body
      }),
    )
  }

  if (opts.extractText) {
    plugins.push(new MiniCssExtractPlugin())
  }

  if (opts.noEmitOnErrors) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
  }

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${opts.env}"`,
    }),
  )

  // put dynamically required modules into the build
  if (config.validations) {
    plugins.push(
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
      }),
    )
  } else {
    plugins.push(
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
      }),
    )
  }

  plugins.push(
    new CopyWebpackPlugin([{ from: '../static' }]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin(),
  )

  // These replacements are necessary until Atlaskit
  // doesn't update to styled-components v4
  plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /@atlaskit\/media-ui\/mixins.js/,
      path.join(
        __dirname,
        '../app/components/CollabEditor/src/media-ui-mixins.js',
      ),
    ),
  )

  plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /@atlaskit\/editor-core\/plugins\/gap-cursor\/styles.js/,
      path.join(
        __dirname,
        '../app/components/CollabEditor/src/gap-cursor-styles.js',
      ),
    ),
  )

  return plugins
}
