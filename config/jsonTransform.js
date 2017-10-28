const cameoTypeCodes = require('../data/cameoTypeCodes');
const cameoCountryCodes = require('../data/cameoCountryCodes');
const cameoKnownGroupCodes = require('../data/cameoKnownGroupCodes');
const cameoEthnicCodes = require('../data/cameoEthnicCodes');
const cameoReligionCodes = require('../data/cameoReligionCodes');
const cameoEventCodes = require('../data/cameoEventCodes');
const fipsCountryCodes = require('../data/fipsCountryCodes');


/**
 * json transform:
 *
 * a smarter transform that
 * - drops redundant fields like Day/MonthYear/Year/FractionDate
 * - drops unreliable fields like Action1Code
 * - projects fields like day to a more usable format
 * - joins fields like Type1Code to cameo code labels
 */
const mapCodes2Label = (codes, labelCollection) => {
  const labels = codes
    .map(code => labelCollection[code])
    .filter(x => x);

  return labels.length > 0 ? labels : undefined;
};


module.exports = entry => ({
  id: entry.GlobalEventID,
  day: `${entry.Day.slice(0,4)}-${entry.Day.slice(4,6)}-${entry.Day.slice(6,8)}`,
  actor1Name: entry.Actor1Name,
  actor1CountryCode: cameoCountryCodes[entry.Actor1CountryCode],
  actor1KnownGroupCode: cameoKnownGroupCodes[entry.Actor1KnownGroupCode],
  actor1EthnicCode: cameoEthnicCodes[entry.Actor1EthnicCode],
  actor1ReligionCodes: mapCodes2Label([
    entry.Actor1Religion1Code, entry.Actor1Religion2Code
  ], cameoReligionCodes),
  actor1TypeCodes: mapCodes2Label([
    entry.Actor1Type1Code, entry.Actor1Type2Code, entry.Actor1Type3Code
  ], cameoTypeCodes),
  actor2Name: entry.Actor2Name,
  actor2CountryCode: cameoCountryCodes[entry.Actor2CountryCode],
  actor2KnownGroupCode: cameoKnownGroupCodes[entry.Actor2KnownGroupCode],
  actor2EthnicCode: cameoEthnicCodes[entry.Actor2EthnicCode],
  actor2ReligionCodes: mapCodes2Label([
    entry.Actor2Religion1Code, entry.Actor2Religion2Code
  ], cameoReligionCodes),
  actor2TypeCodes: mapCodes2Label([
    entry.Actor2Type1Code, entry.Actor2Type2Code, entry.Actor2Type3Code
  ], cameoTypeCodes),
  eventCode: cameoEventCodes[entry.EventCode],
  goldsteinScale: entry.GoldsteinScale,
  avgTone: entry.AvgTone,
  actionGeo_Type: entry.ActionGeo_Type,
  actionGeo_Fullname: entry.ActionGeo_Fullname,
  actionGeo_CountryCode: fipsCountryCodes[entry.ActionGeo_CountryCode],
  actionGeo_Lat: entry.ActionGeo_Lat,
  actionGeo_Long: entry.ActionGeo_Long,
  sourceURL: entry.SOURCEURL
});
