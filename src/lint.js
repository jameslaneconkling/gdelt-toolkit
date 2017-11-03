const JSONStream = require('JSONStream');
const {
  getFile,
} = require('./lib/get');
const {
  entry2JSON,
} = require('./lib/parse');
const linter = require('./lib/linter');
const linters = require('./config/linters');
const {
  defaultDatetime,
  defaultCachePath,
} = require('./utils/defaults');


module.exports = ({
  datetime = defaultDatetime(),
  cachePath = defaultCachePath,
}) =>
  getFile(datetime, cachePath)
    .pipe(entry2JSON())
    .pipe(linter(linters))
    .pipe(JSONStream.stringify('[', ',\n', ']'));
