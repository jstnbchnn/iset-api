const differenceInDays = require('date-fns/difference_in_days');

const { urlBuilder } = require('./lib/urlBuilder');

const API_BASE_URL = 'http://www.iset.net/TournamentSPA';
const TOURNAMENT_ID = 2304;

const { makeGetRequest } = require('./lib/utils');

exports.getScheduleIdsForDivision = async (divisionId) => {
  const url = urlBuilder(
    [API_BASE_URL, 'getDivisionSchedules'],
    {
      did: divisionId,
      tid: TOURNAMENT_ID
    }
  );

  const divisionInfoData = await makeGetRequest({ url });

  return divisionInfoData.map(({ pk: id }) => id);
};


exports.getSchedule = async (divisionId, scheduleId) => {
  const competitions = await makeGetRequest({
    url: `${API_BASE_URL}/getScheduleCompetitions?did=${divisionId}&sid=${scheduleId}&tid=${TOURNAMENT_ID}`
  });

  return competitions;
};

exports.getTeamsFromDivisionId = async (divisionId) => {
  const { divisions } = await makeGetRequest({ url: `${API_BASE_URL}/getTeamsPageData?tid=${TOURNAMENT_ID}` });
  const teams = divisions.reduce((acc, division) => {
    const [{ divisionId }] = division.teams;

    return {
      ...acc,
      [divisionId]: division.teams
    };
  }, {});

  return teams[divisionId].map(({ pk, divisionId, name }) => ({ id: pk, divisionId, name }));
};

exports.getAllCompetitionsForTeam = async (divisionId, teamId) => {
  const scheduleIds = await this.getScheduleIdsForDivision(divisionId);
  const schedulePromises = scheduleIds.map(id => this.getSchedule(divisionId, id));

  const [...results] = await Promise.all(schedulePromises);

  const competitions = results.reduce(flatten, [])
    .filter(({ c1RegisteredTeamId, c2RegisteredTeamId }) =>
      ( c1RegisteredTeamId === teamId || c2RegisteredTeamId === teamId )
    )
    .sort((a, b) => parseInt(a.datetimesort) - parseInt(b.datetimesort))
    .map(squash)
    .map(reduceSets);

  const groupGamesByDate = groupByGameDate(competitions);
  return groupGamesByTense(groupGamesByDate);
};

const groupByGameDate = (competitions) => {
  return competitions.reduce((acc, game) => {
    if (acc[game.longdate]) {
      acc[game.longdate].push(game);
      return acc;
    }

    acc[game.longdate] = [game];
    return acc;
  }, {});
};

const groupGamesByTense = (competitions) => {
  const now = Date.now();

  return Object.keys(competitions).reduce((acc, competitionDate) => {
    const tense = differenceInDays(now, new Date(competitionDate)) <= 0 ? 'futureGames' : 'pastGames';
    acc[tense][competitionDate] = competitions[competitionDate];

    return acc;
  }, { futureGames: {}, pastGames: {} });
};

const flatten = (acc, val) => ([ ...acc, ...val.competitions ]);

const squash = ({
  playingSurface,
  division,
  datetimesort,
  date,
  longdate,
  time,
  winner,
  competitor1,
  competitor2,
  sets
}) => ({
  playingSurface,
  division,
  datetimesort,
  date,
  longdate,
  time,
  winner,
  competitor1,
  competitor2,
  sets
});

const reduceSets = (competition) => {
  if (!competition.sets) return competition;

  competition.sets = competition.sets.map(({ competitor1PointsScored, competitor2PointsScored }) =>
    ({ competitor1PointsScored, competitor2PointsScored }));

  return competition;
};



