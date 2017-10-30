const JSONStream = require('JSONStream');
const get = require('./lib/get');
const {
  entry2JSON
} = require('./lib/parse');
const linter = require('./lib/linter');
const linters = require('./config/linters');
const {
  getUTCDate,
  utcDate2GDELTDate
} = require('./utils/datetime');


module.exports = ({ datetime = utcDate2GDELTDate(getUTCDate()) }) => get(datetime)
  .pipe(entry2JSON())
  .pipe(linter(linters))
  .pipe(JSONStream.stringify('[', ',\n', ']'));
