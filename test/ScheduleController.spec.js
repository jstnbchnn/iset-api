const ScheduleController = require('../src/ScheduleController');

describe('ScheduleController', async () => {

  describe('getScheduleIdsForDivision', () => {
    let divisionIds;

    beforeAll( async () => {
      divisionIds = await ScheduleController.getScheduleIdsForDivision();
    });

    it('returns an array', () => {
      expect(divisionIds).toBeArray();
    });

    it('returns the correct number of ids', () => {
      expect(divisionIds).toHaveLength(3);
    });
  });

  describe('getTeamsFromDivisionId', () => {
    let teams;

    beforeAll( async () => {
      teams = await ScheduleController.getTeamsFromDivisionId('3483');
    });

    it('returns an array', () => {
      expect(teams).toBeArray();
    });

    it('has objects with the right keys', () => {
      //eslint-disable-next-line
      const [team, ...rest] = teams;
      expect(team).toContainAllKeys(['id', 'divisionId', 'name']);
    });
  });
});