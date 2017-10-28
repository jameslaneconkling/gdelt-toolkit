const JSONStream = require('JSONStream');
const get = require('./lib/get');
const {
  entry2JSON
} = require('./lib/parse');
const linter = require('./lib/linter');
const linters = require('./config/linters');

module.exports = ({ datetime }) => get(datetime)
  .pipe(entry2JSON())
  .pipe(linter(linters))
  .pipe(JSONStream.stringify('[', ',\n', ']'));
