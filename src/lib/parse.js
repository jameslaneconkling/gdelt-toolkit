const {
  addIndex,
  reduce,
  compose,
  filter,
} = require('ramda');
const through = require('through2');
const fields = require('../data/fields');


const line2JSON = dropEmptyValues => addIndex(reduce)((out, cellValue, idx) => {
  if (dropEmptyValues && cellValue === '') {
    return out;
  }

  out[fields[idx]] = cellValue; // eslint-disable-line no-param-reassign
  return out;
}, {});


/**
 * @param {object} [transform]  projection function mapping a single GDELT entry object to a transformed object
 *                              e.g.
 *                              ({ GlobalEventID, Day, Actor1Name }) => ({
 *                                id: GlobalEventID,
 *                                date: `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`
 *                                actor1: Actor1Name
 *                              })
 * @param {object} [options] { dropEmptyValues: true }
 */
exports.entry2JSON = (transform = x => x, { dropEmptyValues = true } = { dropEmptyValues: true }) =>
  through.obj((line, enc, next) => {
    next(null, compose(
      filter(value => value !== undefined),
      transform,
      line2JSON(dropEmptyValues)
    )(line));
  });


exports.json2Triple = tripleTransform =>
  through.obj(function (entry, enc, next) {
    tripleTransform(entry)
      .forEach(({ subject, predicate, object }) => {
        if (typeof object === 'object' && object.value !== undefined) {
          this.push({ subject, predicate, object: `${object.value}${object.type ? `^^${object.type}` : ''}` });
        } else if (object !== undefined) {
          this.push({ subject, predicate, object });
        }
      });

    next();
  });


exports.take = num => through.obj((line, enc, next) => {
  num -= 1; // eslint-disable-line no-param-reassign

  if (num >= 0) {
    return next(null, line);
  }

  next(null, null);
});
