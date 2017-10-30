const hyperquest = require('hyperquest');
const fs = require('fs');
const through = require('through2');
const unzipper = require('unzipper');
const csvParse = require('csv-parse');
const BASE_URL = 'http://data.gdeltproject.org/gdeltv2/';


module.exports = date => {
  const fileStream = through.obj();
  const outStream = through.obj();
  const file = `${date}.export.CSV.zip`;

  fs.createReadStream(`${__dirname}/../../cache/${file}`)
    .on('error', error => {
      if (error.code === 'ENOENT') {
        // cache miss
        const fileRequestStream = hyperquest.get(BASE_URL + file)
          .on('response', ({ statusCode, statusMessage }) => {
            if (statusCode >= 400) {
              throw new Error(`Error downloading from ${BASE_URL}${file}: ${statusCode} ${statusMessage}`);
            }
          })
          .on('error', error => console.error(error));

        // write to cache
        fileRequestStream.pipe(fs.createWriteStream(`${__dirname}/../../cache/${file}`));

        // pipe to program
        fileRequestStream.pipe(fileStream);
      } else {
        console.error(error);
      }
    })
    .pipe(fileStream);

  fileStream
    .pipe(unzipper.Parse())
    .pipe(through.obj((entry, enc, next) =>
      entry
        .on('error', err => outStream.destroy(err))
        .on('finish', next)
        .pipe(csvParse({ delimiter: '\t' }))
        .pipe(outStream)
    ));

  return outStream;
};
