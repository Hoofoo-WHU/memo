const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve('src/index.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.[hash:32].js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html')
    })
  ]
}