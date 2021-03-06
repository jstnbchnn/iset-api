const axios = require('axios');

const { urlBuilder } = require('./urlBuilder');

const API_BASE_URL = 'http://www.iset.net/TournamentSPA';
const TOURNAMENT_ID = 2304;

exports.getAllDivisions = async () => {
  const divisionData =
    await this.makeGetRequest({ url: urlBuilder([API_BASE_URL, 'getTournamentDivisions'], { tid: TOURNAMENT_ID })});

  return divisionData.map(division => {
    const { programDivisionName, pk: id } = division;

    return {
      id,
      name: programDivisionName
    };
  });
};

exports.makeGetRequest = async (options) => {
  let { data } = await axios(options);

  return data;
};