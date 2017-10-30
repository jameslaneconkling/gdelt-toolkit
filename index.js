module.exports.request = require('./src/lib/get');
module.exports.entry2JSON = require('./src/lib/parse').entry2JSON;
module.exports.json2Triple = require('./src/lib/parse').json2Triple;
module.exports.linter = require('./src/lib/linter');
module.exports.config = {
  jsonTransform: require('./src/config/jsonTransform'),
  n3Transform: require('./src/config/n3Transform'),
  linters: require('./src/config/linters')
};
