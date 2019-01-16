const PATH   = require('path');
const APP    = './static';
const VENDOR = './node_modules';

let postcssConfig = ({ file, options, env }) => ({
    plugins: {
      /**
       * Autoprefixer: Add vendor prefixes using caniuse.com
       * @see https://github.com/postcss/autoprefixer
       */
      'autoprefixer': {
        browsers: ['last 2 versions', 'ie >= 8', 'safari >= 6', 'and_chr >= 2.3']
      }
    }
});

module.exports = postcssConfig;
