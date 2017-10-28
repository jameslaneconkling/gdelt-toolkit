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
const jsonTransform = require('./config/jsonTransform');
const tripleTransform = require('./config/tripleTransform');


module.exports = ({ format, datetime }) => {
  if (format === 'json') {
    return get(datetime)
      .pipe(entry2JSON(jsonTransform))
      .pipe(JSONStream.stringify('[', ',\n', ']', 2));
  } else if (format === 'n3') {
    return get(datetime)
      .pipe(entry2JSON())
      .pipe(json2Triple(tripleTransform, 'gdelt:Event'))
      .pipe(new StreamWriter({ prefixes }));
  }
};
