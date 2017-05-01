"use strict";

const merge = require('webpack-merge');

const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
  entry: { // The entry file is index.js in /client/src
    app: PATHS.src
  },
  output: { // The output is where the bundle is created
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      loaders.babel, // Transpiler
      loaders.css,   // Bundle will contain the CSS
      loaders.font   // Load fonts
     ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Extensions to resolve
  }
};

let config;
// Switch defines the different config as dev requires webpack-dev
switch(process.env.NODE_ENV){
  case 'build':
    config = merge(
      common,
      { devtool: 'source-map' } // SourceMaps on separate file
    );
    break;
  case 'development':
    config = merge(
      common,
      {devtool: 'eval-source-map' }, // Default value
      loaders.devServer({
        host: process.env.host,
        port: 3000
      })
    );
}

// Gotta export that config
module.exports = config;