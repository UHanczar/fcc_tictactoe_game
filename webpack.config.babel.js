import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// at the end uncomment extractCSS for compiling css file;
const extractCSS = new ExtractTextPlugin('./../css/style.bundle.css');

export default {
  context: path.resolve(__dirname, 'app'),
  entry: [
    'babel-polyfill',
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './App.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000,
    historyApiFallback: true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loader:
        // extractCSS.extract(
      [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    // )
    }]
  },
  plugins: [
    // extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
