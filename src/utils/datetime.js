exports.getUTCDate = () => new Date().toISOString().replace(/T.+Z$/, '');

const utcDate2GDELTDate = exports.utcDate2GDELTDate = utcDateString =>
  `${utcDateString.replace(/-/g, '')}000000`;

const utcDateTime2GDELTDate = exports.utcDateTime2GDELTDate = utcDateTimeString =>
  `${utcDateTimeString.replace(/[-T:]/g, '')}00`;

// YYYY-MM-DD
const isDate = exports.isDate = str => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(str);

// YYYY-MM-DDThh:mm
const isDateTime = exports.isDateTime = str =>
  /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/.test(str);

// YYYYMMDDhhmmss
const isGDELTDateTime = exports.isGDELTDateTime = str => /^[0-9]{14}$/.test(str);

exports.parseDateTime = (datetime) => {
  if (isDate(datetime)) {
    return utcDate2GDELTDate(datetime);
  } else if (isDateTime(datetime)) {
    return utcDateTime2GDELTDate(datetime);
  } else if (isGDELTDateTime(datetime)) {
    return datetime;
  }

  throw new Error(`Unexpected format for datetime ${datetime}.  Expected formats are YYYY-MM-DD, YYYY-MM-DDThh:mm`);
};
