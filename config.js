var path = require('path');
module.exports = {
  appRoot: __dirname,
  webRoot: path.join(__dirname, './www'),
  publicRoot: path.join(__dirname, './www'),

  distFileName: 'docs',
  deployRoot: path.join(__dirname, 'docs'),
  distRoot: path.join(__dirname, 'docs')
};