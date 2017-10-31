const JSONStream = require('JSONStream');
const {
  getFiles,
} = require('./lib/get');


module.exports = () =>
  getFiles()
    .pipe(JSONStream.stringify('[', ',\n', ']', 2));
