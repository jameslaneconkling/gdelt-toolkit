module.exports.request = require('./lib/get');
module.exports.entry2JSON = require('./lib/parse').entry2JSON;
module.exports.json2Triple = require('./lib/parse').json2Triple;
module.exports.linter = require('./lib/linter');
module.exports.config = {
  jsonTransform: require('./config/jsonTransform'),
  n3Transform: require('./config/n3Transform'),
  linters: require('./config/linters')
};
