const through = require('through2');
const fields = require('../data/fields');


const runLinter = (linters, entry) => (field) => {
  const lintError = linters[field](entry[field], entry);

  if (lintError) {
    return {
      id: entry.GlobalEventID, field, value: entry[field], message: lintError,
    };
  }

  return false;
};


const validateLinters = (linters) => {
  const fieldsMap = fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});
  const invalidLinters = Object.keys(linters)
    .filter(field => !fieldsMap[field]);

  if (invalidLinters.length > 0) {
    throw new Error(`Added linters for fields that don't exist: ${invalidLinters.join(', ')}`);
  }
};


module.exports = (linters) => {
  validateLinters(linters);

  return through.obj(function (entry, enc, next) {
    Object.keys(entry)
      .filter(field => linters[field])
      .map(runLinter(linters, entry))
      .filter(lintError => lintError)
      .forEach(lintError => this.push(lintError));

    next();
  });
};
