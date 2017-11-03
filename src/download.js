const JSONStream = require('JSONStream');
const {
  StreamWriter,
} = require('n3');
const {
  getFile,
} = require('./lib/get');
const {
  entry2JSON,
  json2Triple,
} = require('./lib/parse');
const prefixes = require('./config/rdfPrefixes');
const jsonTransform = require('./config/jsonTransform');
const tripleTransform = require('./config/tripleTransform');
const {
  defaultDatetime,
  defaultCachePath,
} = require('./utils/defaults');


module.exports = ({
  format,
  datetime = defaultDatetime(),
  cachePath = defaultCachePath,
}) => {
  if (format === 'json') {
    return getFile(datetime, cachePath)
      .pipe(entry2JSON(jsonTransform))
      .pipe(JSONStream.stringify('[', ',\n', ']', 2));
  } else if (format === 'n3') {
    return getFile(datetime, cachePath)
      .pipe(entry2JSON())
      .pipe(json2Triple(tripleTransform, 'gdelt:Event'))
      .pipe(new StreamWriter({ prefixes }));
  }
};
