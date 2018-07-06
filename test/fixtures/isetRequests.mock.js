const responses = require('./responses');

const API_BASE_URL = 'http://www.iset.net/TournamentSPA';

exports.default = (adapter) => {
  adapter
    .onGet(`${API_BASE_URL}/getStandingsPageData?did=1&tid=2267`)
    .reply(200, {
      standings: responses('standingsData')
    });

  adapter
    .onGet(/\.*getDivisionSchedules.*$/)
    .reply(200, responses('divisionInfoData'));

  adapter
    .onGet(/\.*getTeamsPageData.*$/)
    .reply(200, responses('teamsPageData'));

  adapter
    .onGet(/\.*getScheduleCompetitions.*$/)
    .reply(200, responses('scheduleData'));
};
