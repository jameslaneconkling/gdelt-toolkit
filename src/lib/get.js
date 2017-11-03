const path = require('path');
const url = require('url');
const {
  unlinkSync,
} = require('fs');
const mkdirp = require('mkdirp');
const hyperquest = require('hyperquest');
const fs = require('fs');
const through = require('through2');
const split = require('split2');
const unzipper = require('unzipper');
const csvParse = require('csv-parse');
const {
  defaultCachePath,
} = require('../utils/defaults');
const BASE_URL = 'http://data.gdeltproject.org/gdeltv2/';


const getCachedResource = (file, baseURL, cachePath) => {
  const filePath = path.resolve(cachePath, file);
  const fileStream = through.obj();

  mkdirp.sync(cachePath);

  fs.createReadStream(filePath)
    .on('error', (error) => {
      if (error.code === '') {
        console.log('make dir');
      } else if (error.code === 'ENOENT') {
        // cache miss
        hyperquest.get(url.resolve(baseURL, file))
          .on('response', function ({ statusCode, statusMessage }) {
            if (statusCode >= 400) {
              throw new Error(`Error downloading ${url.resolve(baseURL, file)}: ${statusCode} ${statusMessage}`);
            }

            // write to cache
            this.pipe(fs.createWriteStream(filePath));

            // pipe to program
            this.pipe(fileStream);
          })
          .on('error', (requestError) => {
            // TODO - confirm this actually runs/cleans up file from cache if there's an error downloading file
            unlinkSync(filePath);
            console.error(requestError);
          });
      } else {
        console.error(error);
      }
    })
    .pipe(fileStream);

  return fileStream;
};


const getRemoteResource = (file, baseURL) => {
  const fileStream = through.obj();

  hyperquest.get(url.resolve(baseURL, file))
    .on('response', function ({ statusCode, statusMessage }) {
      if (statusCode >= 400) {
        throw new Error(`Error downloading ${url.resolve(baseURL, file)}: ${statusCode} ${statusMessage}`);
      }

      // pipe to program
      this.pipe(fileStream);
    })
    .on('error', requestError => console.error(requestError));

  return fileStream;
};


exports.getFile = (date, cachePath = defaultCachePath) => {
  const outStream = through.obj();

  (cachePath ?
    getCachedResource(`${date}.export.CSV.zip`, BASE_URL, cachePath) :
    getRemoteResource(`${date}.export.CSV.zip`, BASE_URL)
  )
    .pipe(unzipper.Parse())
    .pipe(through.obj((entry, enc, next) =>
      entry
        .on('error', err => outStream.destroy(err))
        .on('finish', next)
        .pipe(csvParse({ delimiter: '\t' }))
        .pipe(outStream)));

  return outStream;
};


exports.getFileList = (cachePath = defaultCachePath) => (
  (cachePath ?
    getCachedResource('masterfilelist.txt', BASE_URL, cachePath) :
    getRemoteResource('masterfilelist.txt', BASE_URL)
  )
    .pipe(split())
    .pipe(through.obj((chunk, enc, next) => {
      const [id, checksum, fileURL] = chunk.split(' ');

      next(null, { id, checksum, url: fileURL }); // TODO - format datetime
    }))
);
