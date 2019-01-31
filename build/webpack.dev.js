const path = require('path')
const base = require('./webpack.base')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')

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
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'SERVICE_URL': JSON.stringify('http://localhost:3000')
      // 'SERVICE_URL': JSON.stringify('https://memo-server.leanapp.cn')
    }),
    new HotModuleReplacementPlugin()
  ]
})