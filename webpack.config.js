var path = require('path');
var fs = require('fs');

var webpack = require('webpack');

var nodeModules = {};
fs
  .readdirSync(path.join(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(x => nodeModules[x] = `commonjs ${x}`);

module.exports = [
  {
    target: 'node',
    entry: path.join(__dirname, 'server'),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js'
    },
    externals: nodeModules,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: [
              'es2015'
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        HOST: JSON.stringify('localhost'),
        PORT: JSON.stringify('8080')
      })
    ]
  }
];
