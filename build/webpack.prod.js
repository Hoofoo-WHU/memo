const base = require('./webpack.base')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('config')
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(base.output.path, { root: path.resolve('') })
  ]
})