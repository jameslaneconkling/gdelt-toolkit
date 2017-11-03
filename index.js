module.exports.requestFile = require('./src/lib/get').getFile;
module.exports.requestFileList = require('./src/lib/get').getFileList;
module.exports.entry2JSON = require('./src/lib/parse').entry2JSON;
module.exports.json2Triple = require('./src/lib/parse').json2Triple;
module.exports.linter = require('./src/lib/linter');
module.exports.config = {
  jsonTransform: require('./src/config/jsonTransform'),
  tripleTransform: require('./src/config/tripleTransform'),
  linters: require('./src/config/linters'),
};
