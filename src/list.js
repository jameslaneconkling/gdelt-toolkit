const JSONStream = require('JSONStream');
const {
  getFileList,
} = require('./lib/get');


module.exports = () =>
  getFileList()
    .pipe(JSONStream.stringify('[', ',\n', ']', 2));
