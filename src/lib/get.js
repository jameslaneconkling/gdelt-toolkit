const hyperquest = require('hyperquest');
const fs = require('fs');
const through = require('through2');
const split = require('split2');
const unzipper = require('unzipper');
const csvParse = require('csv-parse');
const BASE_URL = 'http://data.gdeltproject.org/gdeltv2/';


const getCachedResource = (file, baseURL, cachePath) => {
  const fileStream = through.obj();

  fs.createReadStream(`${cachePath}/${file}`)
    .on('error', (error) => {
      if (error.code === 'ENOENT') {
        // cache miss
        const fileRequestStream = hyperquest.get(baseURL + file)
          .on('response', ({ statusCode, statusMessage }) => {
            if (statusCode >= 400) {
              throw new Error(`Error downloading from ${baseURL}${file}: ${statusCode} ${statusMessage}`);
            }
          })
          .on('error', requestError => console.error(requestError));

        // write to cache
        fileRequestStream.pipe(fs.createWriteStream(`${cachePath}/${file}`));

        // pipe to program
        fileRequestStream.pipe(fileStream);
      } else {
        console.error(error);
      }
    })
    .pipe(fileStream);

  return fileStream;
};


exports.getFile = (date) => {
  const outStream = through.obj();


  getCachedResource(`${date}.export.CSV.zip`, BASE_URL, `${__dirname}/../../cache`)
    .pipe(unzipper.Parse())
    .pipe(through.obj((entry, enc, next) =>
      entry
        .on('error', err => outStream.destroy(err))
        .on('finish', next)
        .pipe(csvParse({ delimiter: '\t' }))
        .pipe(outStream)));

  return outStream;
};


exports.getFileList = () => (
  getCachedResource('masterfilelist.txt', BASE_URL, `${__dirname}/../../cache`)
    .pipe(split())
    .pipe(through.obj((chunk, enc, next) => {
      const [id, checksum, url] = chunk.split(' ');

      next(null, { id, checksum, url }); // TODO - format datetime
    }))
);
