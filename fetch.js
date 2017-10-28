const JSONStream = require('JSONStream');
const {
  StreamWriter
} = require('n3');
const get = require('./lib/get');
const {
  entry2JSON,
  json2Triple
} = require('./lib/parse');
const prefixes = require('./config/rdfPrefixes');
const predicateTransform = require('./config/predicateTransform');
const fieldTransform = require('./config/fieldTransform');


module.exports = ({ format, datetime }) => {
  if (format === 'json') {
    return get(datetime)
      .pipe(entry2JSON(fieldTransform))
      .pipe(JSONStream.stringify('[', ',\n', ']', 2));
  } else if (format === 'n3') {
    return get(datetime)
      .pipe(entry2JSON())
      .pipe(json2Triple(predicateTransform, 'gdelt:Event'))
      .pipe(new StreamWriter({ prefixes }));
  }
};
