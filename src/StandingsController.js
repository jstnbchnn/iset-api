const { urlBuilder } = require('./lib/urlBuilder');
const { makeGetRequest } = require('./lib/utils');

const API_BASE_URL = 'http://www.iset.net/TournamentSPA';
const TOURNAMENT_ID = 2267;

exports.getStandingsForTeam = async (divisionId) => {
  const { standings: standingsData } = await makeGetRequest({
    url: urlBuilder([API_BASE_URL, 'getStandingsPageData'],
      {
        did: divisionId,
        tid: TOURNAMENT_ID
      }
    )});

  const standings = standingsData
    .reduce(flatten, [])
    .reduce(setRecordByTeamId, {});

  return sortByWins(standings);
};

const sortByWins = (teams) => {
  return Object.values(teams)
    .sort((a, b) => {
      return b.compsWon - a.compsWon;
    });
};

const flatten = (acc, val) => [...acc, ...val.drawList];

const setRecordByTeamId = (acc, val) => {
  if (acc[val.registeredTeamId]) {
    acc[val.registeredTeamId].compsWon += val.draw.CompsWon;
    acc[val.registeredTeamId].compsLost += val.draw.CompsLost;
    return acc;
  }

  acc[val.registeredTeamId] = {
    compsWon: val.draw.CompsWon,
    compsLost: val.draw.CompsLost,
    teamName: val.draw.TeamName
  };

  return acc;
};