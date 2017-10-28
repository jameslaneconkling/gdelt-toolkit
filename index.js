const JSONStream = require('JSONStream');
const get = require('./lib/get');
const {
  entry2JSON,
} = require('./lib/parse');
const fieldTransform = require('./config/fieldTransform');


get(20150218230000)
  .pipe(entry2JSON(fieldTransform))
  .pipe(JSONStream.stringify('[', ',\n', ']', 2))
  .pipe(process.stdout);
