const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = {
  mode: 'development',

  context: path.join(__dirname, 'ui'),

  entry: ['./index.js'],

  output: {
    path: path.join(__dirname, 'assets', 'ui'),
    filename: 'index.js'
  },

  resolve: {
    extensions: ['.js', 'jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyPlugin([
      {
        from: './static/global.css',
        to: 'global.css'
      },
    ]),
    new WebpackBuildNotifierPlugin({
      title: 'Hypha Build'
    })
  ],

  watch: true,

  watchOptions: {
    aggregateTimeout: 500
  }
}
