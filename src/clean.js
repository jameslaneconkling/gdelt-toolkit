const path = require('path');
const {
  readdir,
  mkdirSync,
  unlinkSync,
} = require('fs');
const {
  defaultCachePath,
} = require('./utils/defaults');


module.exports = ({ cachePath = defaultCachePath }) => {
  readdir(cachePath, (err, files) => {
    if (err && err.code === 'ENOENT') {
      return mkdirSync(cachePath);
    } else if (err) {
      return console.error(err);
    }

    files.forEach(file => file !== '.gitkeep' && unlinkSync(path.resolve(cachePath, file)));
  });
};
