var path = require('path');


module.exports = {
  entry: './src/index',
  output: {
    filename: 'watchthedocs-reveal-plugin.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'WatchTheDocs',
    libraryTarget: 'var'
  },
  externals: {
    'reveal.js': 'Reveal'
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/?$/, to: '/public/reveal/index.html' },
      ]
    }
  }
};
