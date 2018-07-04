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
  const { registeredTeamId, draw: { CompsWon, CompsLost, TeamName }} = val;

  if (acc[registeredTeamId]) {
    acc[registeredTeamId].compsWon += CompsWon;
    acc[registeredTeamId].compsLost += CompsLost;
    return acc;
  }

  acc[registeredTeamId] = {
    compsWon: CompsWon,
    compsLost: CompsLost,
    teamName: TeamName
  };

  return acc;
};