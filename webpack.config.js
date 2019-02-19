const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'services': path.resolve(__dirname, './src/services'),
      'resources': path.resolve(__dirname, './src/services/resources'),
      'responses': path.resolve(__dirname, './src/services/responses'),
      'utils': path.resolve(__dirname, './src/utils')
    }
  }
};