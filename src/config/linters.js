const {
  range,
  equals,
} = require('ramda');
const cameoTypeCodes = require('../data/cameoTypeCodes');
const cameoCountryCodes = require('../data/cameoCountryCodes');
const cameoKnownGroupCodes = require('../data/cameoKnownGroupCodes');
const cameoEthnicCodes = require('../data/cameoEthnicCodes');
const cameoReligionCodes = require('../data/cameoReligionCodes');
const cameoEventCodes = require('../data/cameoEventCodes');
const fipsCountryCodes = require('../data/fipsCountryCodes');


/**
 * Actor Type Linters
 */
const actorTypeCode = typeCode => !cameoTypeCodes[typeCode] && `Should be a CAMEO Type code: ${typeCode}`;
const actorCountryCode = cameoCountryCode => !cameoCountryCodes[cameoCountryCode] && `Should be a CAMEO Country code: ${cameoCountryCode}`;
const actorKnownGroupCode = knownGroupCode => !cameoKnownGroupCodes[knownGroupCode] && `Should be a CAMEO Known Group code: ${knownGroupCode}`;
const actorEthnicCode = ethnicCode => !cameoEthnicCodes[ethnicCode] && `Should be a CAMEO Ethnic code: ${ethnicCode}`;
const actorReligionCode = religionCode => !cameoReligionCodes[religionCode] && `Should be a CAMEO Religion code: ${religionCode}`;
const actorCode = prefix => (actorCodeString, entry) => {
  const countryCode = entry[`${prefix}CountryCode`];
  const knownGroupCode = entry[`${prefix}KnownGroupCode`];
  const ethnicCode = entry[`${prefix}EthnicCode`];
  const religion1Code = entry[`${prefix}Religion1Code`];
  const religion2Code = entry[`${prefix}Religion2Code`];
  const type1Code = entry[`${prefix}Type1Code`];
  const type2Code = entry[`${prefix}Type2Code`];
  const type3Code = entry[`${prefix}Type3Code`];

  if (actorCodeString.length % 3 !== 0) {
    return 'Should be made up of 3 letter codes';
  }

  const actorCodes = range(0, Math.floor(actorCodeString.length / 3))
    .map(idx => actorCodeString.slice(idx * 3, (idx + 1) * 3))
    .sort((a, b) => a < b ? -1 : 1);

  const unknownCodes = actorCodes
    .filter(code => (
      !cameoTypeCodes[code] && !cameoCountryCodes[code] && !cameoKnownGroupCodes[code] &&
      !cameoEthnicCodes[code] && !cameoReligionCodes[code]
    ));

  if (unknownCodes.length > 0) {
    return `Should not contain unknown codes: ${unknownCodes.join(', ')}`;
  }

  const expectedCodes = [
    countryCode, knownGroupCode, ethnicCode, religion1Code, religion2Code,
    type1Code, type2Code, type3Code,
  ]
    .filter(x => x)
    .sort((a, b) => a < b ? -1 : 1);

  return !equals(actorCodes, expectedCodes) && `Should be a concatenation of actor codes: ${expectedCodes.join(', ')}`;
};


/**
 * Geo Linters
 */
const geoType = prefix => (type, entry) => {
  const countryCode = entry[`${prefix}Geo_CountryCode`];
  if (type === '0' && countryCode) {
    return `Should only be 0 if ${prefix}Geo_CountryCode is not present: ${countryCode}`;
  }

  return ['0', '1', '2', '3', '4', '5'].indexOf(type) === -1 && `Should be 0, 1, 2, 3, 4, 5, not ${type}`;
};
const geoCountryCode = fipsCountryCode => !fipsCountryCodes[fipsCountryCode] && `Should be a Fips Country code: ${fipsCountryCode}`;
const geoAdm1Code = prefix => (code, entry) => {
  const expectedCountryCode = entry[`${prefix}Geo_CountryCode`];
  const countryCode = code.slice(0, 2);
  // const adm1Code = code.slice(2);

  if (countryCode !== expectedCountryCode) {
    return 'First two characters should match Fips Country code';
  }

  // TODO - lint adm1 code
};


module.exports = {
  GlobalEventID: id => !id && 'Should have a GlobalEventId',
  Day: date => !/^\d{8}$/.test(date) && `Should be of the format YYYYMMDD, not ${date}`,
  Actor1Code: actorCode('Actor1'),
  Actor2Code: actorCode('Actor2'),
  Actor1CountryCode: actorCountryCode,
  Actor2CountryCode: actorCountryCode,
  Actor1KnownGroupCode: actorKnownGroupCode,
  Actor2KnownGroupCode: actorKnownGroupCode,
  Actor1EthnicCode: actorEthnicCode,
  Actor2EthnicCode: actorEthnicCode,
  Actor1Religion1Code: actorReligionCode,
  Actor1Religion2Code: actorReligionCode,
  Actor2Religion1Code: actorReligionCode,
  Actor2Religion2Code: actorReligionCode,
  Actor1Type1Code: actorTypeCode,
  Actor1Type2Code: actorTypeCode,
  Actor1Type3Code: actorTypeCode,
  Actor2Type1Code: actorTypeCode,
  Actor2Type2Code: actorTypeCode,
  Actor2Type3Code: actorTypeCode,
  IsRootEvent: flag => !(flag === '0' || flag === '1') && `Should be 0 or 1, not ${flag}`,
  EventCode: eventCode => !cameoEventCodes[eventCode] && `Should be a known CAMEO event code, not: ${eventCode}`,
  EventBaseCode: (baseCode, { EventCode }) => baseCode !== EventCode.substr(0, 3) && `Should match first three numbers of event code, not: ${baseCode}`,
  EventRootCode: (rootCode, { EventCode }) => rootCode !== EventCode.substr(0, 2) && `Should match first two numbers of event code, not: ${rootCode}`,
  QuadClass: quadClass => ['1', '2', '3', '4'].indexOf(quadClass) === -1 && `Should be 1, 2, 3, 4, not ${quadClass}`,
  GoldsteinScale: scale => !(parseFloat(scale) >= -10 && parseFloat(scale) <= 10) && `Should be a float between -10.0 and 10.0, not ${scale}`,
  NumMentions: mentions => !(parseInt(mentions, 10) >= 1) && 'Should be an integer >= 1',
  AvgTone: tone => !(parseFloat(tone) >= -100 && parseFloat(tone) <= 100) && `Should be a float between -10.0 and 10.0, not ${tone}`,
  ActionGeo_Type: geoType('Action'),
  ActionGeo_CountryCode: geoCountryCode,
  ActionGeo_ADM1Code: geoAdm1Code('Action'),
  // TODO ActionGeo_ADM2Code
  ActionGeo_Lat: lat => !(parseFloat(lat) >= -90 && parseFloat(lat) <= 90) && `Should be a valid latitude, not ${lat}`,
  ActionGeo_Long: lng => !(parseFloat(lng) >= -180 && parseFloat(lng) <= 180) && `Should be a valid longitude, not ${lng}`,
  // TODO ActionGeo_FeatureID
  DATEADDED: date => !/^\d{14}$/.test(date) && `Should be of the format YYYYMMDDHHMMSS, not ${date}`,
};
