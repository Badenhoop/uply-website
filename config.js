var path = require('path');
module.exports = {
  appRoot: __dirname,
  webRoot: path.join(__dirname, './www'),
  publicRoot: path.join(__dirname, './www'),

  distFileName: 'public',
  deployRoot: path.join(__dirname, 'public'),
  distRoot: path.join(__dirname, 'public')
};