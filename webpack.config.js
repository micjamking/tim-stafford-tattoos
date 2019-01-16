/**
 * Webpack Configuration
 */


// Third-party dependencies
const PATH         = require('path');
const CHALK        = require('chalk');
const WEBPACK      = require('webpack');
const EXTRACT_TEXT = require('extract-text-webpack-plugin');
const PROGRESS_BAR = require('progress-bar-webpack-plugin');
const UGLIFYJS     = require('uglifyjs-webpack-plugin');


// Environment variables
const APP           = './static';
const VENDOR        = './node_modules';
const ENTRY         = './source/entry.js';
const IS_PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false;


let webpackConfig = (function(){


  /**
   * Configuration object
   */
  let config = {};


  /**
   * Entry Point - JS root file
   * @see https://webpack.js.org/configuration/entry-context/
   */
  config.entry = PATH.resolve( __dirname, ENTRY );


  /**
   * Output - Compiled JS file (referenced in HTML)
   * @see https://webpack.js.org/configuration/output/
   */
  config.output = {
    path: PATH.resolve( __dirname, APP ),
    publicPath: APP + '/',
    filename: 'script.js',
  };


  /**
   * Module Transformations - Rules for how to preprocess files into modules
   * @see https://webpack.js.org/configuration/module/
   */
  config.module = {
    rules: [
      {
        /**
         * Script Transformations - Output ES/TS to JS files
         */
        test: /\.js$|\.es$|\.ts$/,
        use: [
          {
            /**
             * Babel - Compiles next-gen JavaScript (ES6+) to browser-compatible JS
             * @see https://babeljs.io/docs/setup/#installation
             */
            loader: 'babel-loader',
            query: {
              presets: ['env', 'es2015-node6', 'stage-2']
            }
          },
          {
            /**
             * ESLint - The pluggable linting utility for JavaScript and JSX
             * @see https://github.com/MoOx/eslint-loader
             */
            loader: 'eslint-loader',
            options: {
              baseConfig: {
                extends: [
                  'eslint:recommended'
                ]
              },
              parser: 'babel-eslint',
              envs: [
                'browser',
                'es6',
                'node'
              ],
              rules: {
                strict: 0,
                quotes: [
                  2,
                  'single'
                ],
                'no-unused-vars': 1,
                'no-console': 0
              }
            }
          }
        ]
      },
      {
        /**
         * Style Transformations - Output SASS/SCSS to CSS files
         */
        test: /\.css$|\.sass$|\.scss$/,
        use: EXTRACT_TEXT.extract({
          use: [
            {
              /**
               * CSS Loader - Transpiles CSS into CommonJS (for Webpack)
               * @see https://github.com/webpack-contrib/css-loader
               */
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                url: false,
                minimize: IS_PRODUCTION // Uses cssnano
              }
            },
            {
              /**
               * PostCSS - CSS transformations via JS Plugins
               * @see ./postcss.config.js for settings
               * @see https://github.com/postcss/postcss-loader
               */
              loader: 'postcss-loader'
            },
            {
              /**
               * Sass - Compile Sass to CSS using node-sass
               * @see https://github.com/webpack-contrib/sass-loader
               */
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                includePaths: [ ]
              }
            }
          ],
          fallback: {
            /**
             * Style Loader - Adds CSS to the DOM by injecting a <style> tag
             * @see https://github.com/webpack-contrib/style-loader
             */
            loader: 'style-loader'
          }
        })
      }
    ]
  };


  /**
   * Resolve - Include paths & options for resolving dependencies
   * @see https://webpack.js.org/configuration/resolve/
   */
  config.resolve = {
    modules: [
      PATH.resolve( VENDOR )
    ],
    alias: {
      'vue': 'vue/dist/vue.min.js'
    }
  };


  /**
   * Plugins - Customize build process
   * @see https://webpack.js.org/configuration/plugins/
   */
  config.plugins = [
    new EXTRACT_TEXT({
      filename: 'style.css',
      allChunks: true
    }),
    new PROGRESS_BAR({
      format: '  build [:bar] ' + CHALK.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ];


  /**
   * Externals - Dependencies excluded from build process (globals)
   * @see https://webpack.js.org/configuration/externals/#externals
   */
  config.externals = {};

  /**
   * Profiler stats during compilation
   */
  config.stats = {
    colors: true,
    errors: true,
    errorDetails: true,
    cached: true
  };


  /**
   * Production conditions
   */
  if (IS_PRODUCTION) {

    config.plugins.push(new UGLIFYJS());

    config.plugins.push(
      new WEBPACK.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    )

  }

  return config;
})();

module.exports = webpackConfig;
