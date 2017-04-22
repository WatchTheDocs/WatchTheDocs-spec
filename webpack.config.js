var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: {
    plugin: './app/plugin',
    full: './app/full',
  },
  output: {
    filename: 'watchthedocs-[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
