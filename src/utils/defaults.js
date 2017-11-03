const {
  getUTCDate,
  utcDate2GDELTDate,
} = require('./datetime');


exports.defaultDatetime = () => utcDate2GDELTDate(getUTCDate());
exports.defaultCachePath = `${__dirname}/../../cache`;
