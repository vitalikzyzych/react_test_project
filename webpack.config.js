var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './src/index'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: './bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss',
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
        ]
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
        loaders: [ 'url?limit=10000' ],
      }
    ]
  },
  postcss: [
    autoprefixer
  ]
};
