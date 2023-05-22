'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  resolve: {
    roots: [path.resolve(__dirname, 'src')]
  },
  entry: {
    app: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    open: true,
    hot: true,
    watchFiles: [path.resolve(__dirname), 'src/**/*.html']
  },
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader', options: {minimize: true} },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' })
  ]
}
