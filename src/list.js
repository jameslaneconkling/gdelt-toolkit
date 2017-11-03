const JSONStream = require('JSONStream');
const {
  getFileList,
} = require('./lib/get');
const {
  defaultCachePath,
} = require('./utils/defaults');


module.exports = ({ cachePath = defaultCachePath }) =>
  getFileList(cachePath)
    .pipe(JSONStream.stringify('[', ',\n', ']', 2));
