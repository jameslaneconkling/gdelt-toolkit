/* eslint-disable max-len */
const cameoTypeCodes = require('../data/cameoTypeCodes');
const cameoCountryCodes = require('../data/cameoCountryCodes');
const cameoKnownGroupCodes = require('../data/cameoKnownGroupCodes');
const cameoEthnicCodes = require('../data/cameoEthnicCodes');
const cameoReligionCodes = require('../data/cameoReligionCodes');
const cameoEventCodes = require('../data/cameoEventCodes');
const fipsCountryCodes = require('../data/fipsCountryCodes');
const uuidv4 = require('uuid/v4');

/**
 * triple transform:
 *
 * a smarter transform that
 * - drops redundant fields like Day/MonthYear/Year/FractionDate
 * - drops unreliable fields like Action1Code
 * - projects fields like day to a more usable format
 * - joins fields like Type1Code to cameo code labels
 * - groups triples by event, actor, and place subjects
 */

const literal = (value, type) => {
  if (value === undefined) {
    return undefined;
  } else if (type === undefined) {
    return { value: `"${value}"` };
  }

  return { value: `"${value}"`, type };
};

const formatEventLabel = label => label.replace(/, not specified below$/, '');
const formatActorLabel = label => label ?
  label.toLowerCase().replace(/^[a-z]/, c => c.toUpperCase()) :
  undefined;
const formatCoordinate = (lat, long) => lat !== undefined && long !== undefined ?
  `${lat},${long}` :
  undefined; // TODO - look up geo coordinate type


module.exports = (entry) => {
  const eventURI = `gdelt:${entry.GlobalEventID}`;
  const actor1URI = `gdelt:${uuidv4()}`;
  const actor2URI = `gdelt:${uuidv4()}`;
  const placeURI = `gdelt:${uuidv4()}`;

  return [
    // event subject
    { subject: eventURI, predicate: 'rdf:type', object: 'gdelt:Event' },
    { subject: eventURI, predicate: 'gdelt:actor1', object: actor1URI },
    { subject: eventURI, predicate: 'gdelt:actor2', object: actor2URI },
    { subject: eventURI, predicate: 'gdelt:date', object: literal(`${entry.Day.slice(0, 4)}-${entry.Day.slice(4, 6)}-${entry.Day.slice(6, 8)}`, 'xsd:date') },
    { subject: eventURI, predicate: 'rdfs:label', object: literal(formatEventLabel(cameoEventCodes[entry.EventCode])) },
    { subject: eventURI, predicate: 'gdelt:goldsteinScale', object: literal(entry.GoldsteinScale, 'xsd:decimal') },
    { subject: eventURI, predicate: 'gdelt:avgTone', object: literal(entry.AvgTone, 'xsd:decimal') },
    { subject: eventURI, predicate: 'gdelt:geographicPrecision', object: literal(entry.ActionGeo_Type) },
    { subject: eventURI, predicate: 'gdelt:source_url', object: literal(entry.SOURCEURL) },

    // TODO - place?
    { subject: placeURI, predicate: 'rdfs:label', object: literal(entry.ActionGeo_Fullname) },
    { subject: placeURI, predicate: 'gdelt:country', object: literal(fipsCountryCodes[entry.ActionGeo_CountryCode]) },
    { subject: placeURI, predicate: 'gdelt:coordinate', object: literal(formatCoordinate(entry.ActionGeo_Lat, entry.ActionGeo_Long)) },

    // actor1 subject
    { subject: actor1URI, predicate: 'rdf:type', object: 'gdelt:Actor' },
    { subject: actor1URI, predicate: 'rdfs:label', object: literal(formatActorLabel(entry.Actor1Name)) },
    { subject: actor1URI, predicate: 'gdelt:country', object: literal(cameoCountryCodes[entry.Actor1CountryCode]) },
    { subject: actor1URI, predicate: 'gdelt:knownGroup', object: literal(cameoKnownGroupCodes[entry.Actor1KnownGroupCode]) },
    { subject: actor1URI, predicate: 'gdelt:ethnicity', object: literal(cameoEthnicCodes[entry.Actor1EthnicCode]) },
    { subject: actor1URI, predicate: 'gdelt:religion', object: literal(cameoReligionCodes[entry.Actor1Religion1Code]) },
    { subject: actor1URI, predicate: 'gdelt:religion', object: literal(cameoReligionCodes[entry.Actor1Religion2Code]) },
    { subject: actor1URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor1Type1Code]) },
    { subject: actor1URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor1Type2Code]) },
    { subject: actor1URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor1Type3Code]) },
    // TODO - match actor to place
    { subject: actor1URI, predicate: 'gdelt:geographicPrecision', object: literal(entry.Actor1Geo_Type) },
    { subject: actor1URI, predicate: 'gdelt:location', object: literal(entry.Actor1Geo_Fullname) },
    { subject: actor1URI, predicate: 'gdelt:country', object: literal(fipsCountryCodes[entry.Actor1Geo_CountryCode]) },
    { subject: actor1URI, predicate: 'gdelt:coordinate', object: literal(formatCoordinate(entry.Actor1Geo_Lat, entry.Actor1Geo_Long)) },

    // actor2 subject
    { subject: actor2URI, predicate: 'rdf:type', object: 'gdelt:Actor' },
    { subject: actor2URI, predicate: 'rdfs:label', object: literal(formatActorLabel(entry.Actor2Name)) },
    { subject: actor2URI, predicate: 'gdelt:country', object: literal(cameoCountryCodes[entry.Actor2CountryCode]) },
    { subject: actor2URI, predicate: 'gdelt:knownGroup', object: literal(cameoKnownGroupCodes[entry.Actor2KnownGroupCode]) },
    { subject: actor2URI, predicate: 'gdelt:ethnicity', object: literal(cameoEthnicCodes[entry.Actor2EthnicCode]) },
    { subject: actor2URI, predicate: 'gdelt:religion', object: literal(cameoReligionCodes[entry.Actor2Religion1Code]) },
    { subject: actor2URI, predicate: 'gdelt:religion', object: literal(cameoReligionCodes[entry.Actor2Religion2Code]) },
    { subject: actor2URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor2Type1Code]) },
    { subject: actor2URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor2Type2Code]) },
    { subject: actor2URI, predicate: 'gdelt:type', object: literal(cameoTypeCodes[entry.Actor2Type3Code]) },
    // TODO - match actor to place
    { subject: actor2URI, predicate: 'gdelt:geographicPrecision', object: literal(entry.Actor2Geo_Type) },
    { subject: actor2URI, predicate: 'gdelt:location', object: literal(entry.Actor2Geo_Fullname) },
    { subject: actor2URI, predicate: 'gdelt:country', object: literal(fipsCountryCodes[entry.Actor2Geo_CountryCode]) },
    { subject: actor2URI, predicate: 'gdelt:coordinate', object: literal(formatCoordinate(entry.Actor2Geo_Lat, entry.Actor2Geo_Long)) },
  ];
};
