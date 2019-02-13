﻿// Webpack v4
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { 
    main: './src/index.js', 
    install: './src/install.js' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
        {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      }
    ]
  },
plugins: [ 
    new ExtractTextPlugin(
      {filename: 'style.css'}
    ),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.php',
      filename: 'index.php'
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      inject: false,
      hash: true,
      filename: 'install.php',
      template: 'src/install.php'
    })
  ]
}