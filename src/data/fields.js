// http://data.gdeltproject.org/documentation/GDELT-Event_Codebook-V2.0.pdf
module.exports = [
  'GlobalEventID',
  'Day',                  // YYYYMMDD
  'MonthYear',            // YYYYMM
  'Year',                 // YYYY
  'FractionDate',         // YYYY.FFFF, FFFF is the percentage of the year completed by that day
  'Actor1Code',           // The complete raw CAMEO code for Actor1 (includes geographic, class, ethnic, religious, and type classes). May be blank if the system was unable to identify an Actor1.
  'Actor1Name',           // (string) The actual name of the Actor1. In the case of a political leader or organization, this will be the leader’s formal name (GEORGE W BUSH, UNITED NATIONS), for a geographic match it will be either the country or capital/major city name (UNITED STATES / PARIS), and for ethnic, religious, and type matches it will reflect the root match class (KURD, CATHOLIC, POLICE OFFICER, etc). May be blank if the system was unable to identify an Actor1.
  'Actor1CountryCode',    // (string) The 3-character CAMEO code for the country affiliation of Actor1. May be blank if the system was unable to identify an Actor1 or determine its country affiliation (such as “UNIDENTIFIED GUNMEN”)
  'Actor1KnownGroupCode', // (string) If Actor1 is a known IGO/NGO/rebel organization (Unitet Nations, World Bank, al-Qaeda, etc) with its own CAMEO code, this field will contain that code
  'Actor1EthnicCode',     // (string) If the source document specifies the ethnic affiliation of Actor1 and that ethnic group has a CAMEO entry, the CAMEO code is entered here. NOTE: a few special groups like ARAB may also have entries in the type column due to legacy CAMEO behavior. NOTE: this behavior is highly experimental and may not capture all affiliations properly – for more comprehensive and sophisticated identification of ethnic affiliation, it is recommended that users use the GDELT Global Knowledge Graph’s ethnic, religious, and social group taxonomies and post-enrich actors from the GKG.
  'Actor1Religion1Code',  //  (string) If the source document specifies the religious affiliation of Actor1 and that religious group has a CAMEO entry, the CAMEO code is entered here. NOTE: a few special groups like JEW may also have entries in the geographic or type columns due to legacy CAMEO behavior. NOTE: this behavior is highly experimental and may not capture all affiliations properly – for more comprehensive and sophisticated identification of ethnic affiliation, it is recommended that users use the GDELT Global Knowledge Graph’s ethnic, religious, and social group taxonomies and post-enrich actors from the GKG.
  'Actor1Religion2Code',  // (string) If multiple religious codes are specified for Actor1, this contains the secondary code. Some religion entries automatically use two codes, such as Catholic, which invokes Christianity as Code1 and Catholicism as Code2.
  'Actor1Type1Code',      // (string) The 3-character CAMEO code of the CAMEO “type” or “role” of Actor1, if specified. This can be a specific role such as Police Forces, Government, Military, Political Opposition, Rebels, etc, a broad role class such as Education, Elites, Media, Refugees, or organizational classes like Non-Governmental Movement. Special codes such as Moderate and Radical may refer to the operational strategy of a group.
  'Actor1Type2Code',
  'Actor1Type3Code',
  'Actor2Code',
  'Actor2Name',
  'Actor2CountryCode',
  'Actor2KnownGroupCode',
  'Actor2EthnicCode',
  'Actor2Religion1Code',
  'Actor2Religion2Code',
  'Actor2Type1Code',
  'Actor2Type2Code',
  'Actor2Type3Code',
  'IsRootEvent',
  'EventCode', // This is the raw CAMEO action code describing the action that Actor1 performed upon Actor2.
  'EventBaseCode',
  'EventRootCode',
  'QuadClass', // The entire CAMEO event taxonomy is ultimately organized under four primary classifications: Verbal Cooperation, Material Cooperation, Verbal Conflict, and Material Conflict. This field specifies this primary classification for the event type, allowing analysis at the highest level of aggregation. The numeric codes in this field map to the Quad Classes as follows: 1=Verbal Cooperation, 2=Material Cooperation, 3=Verbal Conflict, 4=Material Conflict.
  'GoldsteinScale',
  'NumMentions',
  'NumSources',
  'NumArticles',
  'AvgTone',
  'Actor1Geo_Type',
  'Actor1Geo_Fullname',
  'Actor1Geo_CountryCode',
  'Actor1Geo_ADM1Code',
  'Actor1Geo_ADM2Code',
  'Actor1Geo_Lat',
  'Actor1Geo_Long',
  'Actor1Geo_FeatureID',
  'Actor2Geo_Type',
  'Actor2Geo_Fullname',
  'Actor2Geo_CountryCode',
  'Actor2Geo_ADM1Code',
  'Actor2Geo_ADM2Code',
  'Actor2Geo_Lat',
  'Actor2Geo_Long',
  'Actor2Geo_FeatureID',
  'ActionGeo_Type',
  'ActionGeo_Fullname',
  'ActionGeo_CountryCode',
  'ActionGeo_ADM1Code',
  'ActionGeo_ADM2Code',
  'ActionGeo_Lat',
  'ActionGeo_Long',
  'ActionGeo_FeatureID',
  'DATEADDED', // YYYYMMDDHHMMSS
  'SOURCEURL'
];
