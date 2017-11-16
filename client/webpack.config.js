var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
          },{
            loader: 'css-loader'
          },{
            loader: 'sass-loader'}
        ],
        // include: path.join(__dirname, 'styles')                
      }
    ]
  }
};
