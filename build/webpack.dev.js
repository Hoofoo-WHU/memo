const path = require('path')
const base = require('./webpack.base')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})