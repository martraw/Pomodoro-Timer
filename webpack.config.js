const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
      })
    }]
  },


  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};