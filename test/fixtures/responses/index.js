// import all the response .jsons
const standingsData = require('./standingsData');
const divisionInfoData = require('./divisionInfoData');
const teamsPageData = require('./teamsPageData');
const scheduleData = require('./scheduleData');

module.exports = (request) => {
  switch (request) {
  case 'standingsData':
    return standingsData;
  case 'divisionInfoData':
    return divisionInfoData;
  case 'teamsPageData':
    return teamsPageData;
  case 'scheduleData':
    return scheduleData;
  default:
    break;
  }
};