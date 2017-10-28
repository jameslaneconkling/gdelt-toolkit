exports.getUTCDate = () => new Date().toISOString().replace(/T[0-9:\.]+Z$/, '');

exports.utcDate2GDELTDate = utcDateString => `${utcDateString.replace(/-/g, '')}000000`;
