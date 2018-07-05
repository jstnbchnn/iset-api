const StandingsController = require('../src/StandingsController');

describe('StandingsController', async () => {
  let standings;
  beforeAll( async () => {
    standings = await StandingsController.getStandingsForTeam('1');
  });

  xit('returns an array', async () => {
    expect.toBeArray(standings);
  });

  xit('returns objects in the right shape', () => {
    //eslint-disable-next-line
    const [firstPlace, ...rest] = standings;

    expect(firstPlace).toContainAllKeys(['compsWon', 'compsLost', 'teamName']);
  });

  it('sorts the returned arrray correctly', () => {
    const [firstPlace, secondPlace] = standings;
    expect(firstPlace.compsWon).toBeGreaterThan(secondPlace.compsWon);
  });
});