const JSONStream = require('JSONStream');
const get = require('./lib/get');
const {
  entry2JSON,
} = require('./lib/parse');
const fieldTransform = require('./config/fieldTransform');


module.exports = ({ datetime }) => {
  return get(datetime)
    .pipe(entry2JSON(fieldTransform))
    .pipe(JSONStream.stringify('[', ',\n', ']', 2));
};
