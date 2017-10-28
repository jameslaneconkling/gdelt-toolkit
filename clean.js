const {
  readdir,
  makedirSync,
  unlinkSync
} = require('fs');

module.exports = () => {
  readdir(`${__dirname}/cache/`, (err, files) => {
    if (err && err.code === 'ENOENT') {
      return makedirSync(`${__dirname}/cache/`);
    } else if (err) {
      return console.error(err);
    }

    files.forEach((file) => file !== '.gitkeep' && unlinkSync(`${__dirname}/cache/${file}`));
  });
};
