const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/js/JabcodeJSInterface.js',
    /*output: {
        filename: 'jabcodeJSLib.min.js',
        path: path.resolve(__dirname, 'dist')
    },*/
    resolve: {
        fallback: {
            path: require.resolve("path-browserify"),
            fs:false
        }
    },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: false,
          keep_classnames:true
        }
      })
    ]
  }
};