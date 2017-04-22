var path = require('path');


module.exports = {
  entry: './app/index',
  output: {
    filename: 'watchthedocs-reveal.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    library: 'WatchTheDocs',
    libraryTarget: 'var'
  },
  externals: {
    'reveal.js': 'Reveal'
  }
};
