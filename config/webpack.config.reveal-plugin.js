var path = require('path');


module.exports = {
  entry: './src/reveal-plugin',
  output: {
    filename: 'watchthedocs-reveal-plugin.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/dist/',
    library: 'WatchTheDocs',
    libraryTarget: 'var'
  },
  externals: {
    'reveal.js': 'Reveal',
    'headjs': 'head'
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/?$/, to: '/public/reveal/index.html' },
        { from: /^\/script.watch$/, to: '/public/reveal/script.watch' }
      ]
    }
  }
};
