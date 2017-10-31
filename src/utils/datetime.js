exports.getUTCDate = () => new Date().toISOString().replace(/T[0-9:\.]+Z$/, '');

exports.utcDate2GDELTDate = utcDateString => `${utcDateString.replace(/-/g, '')}000000`;

// YYYY-MM-DD
exports.isDate = str => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(str);

// YYYY-MM-DDThh:mm
exports.isDateTime = str => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$T[0-9]{2}:[0-9]{2}/.test(str);