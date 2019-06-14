const express = require('express');
const cors = require('cors');

const ScheduleController = require('./src/ScheduleController');
const StandingsController = require('./src/StandingsController');
const { getAllDivisions } = require('./src/lib/utils');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

app.use((req, res, next) => {
  console.log(['req', req]);
  next();
});

app.get('/', async (req, res) => {
  try {
    const divisions = await getAllDivisions();

    res.json(divisions);
  } catch (error) {
    console.error(error);
  }
});

app.get('/division/:divisionId', async (req, res) => {
  const { divisionId } = req.params;
  const teams = await ScheduleController.getTeamsFromDivisionId(divisionId);

  res.json(teams);
});

app.get('/teams', async (req, res) => {
  const { divisionId, teamId } = req.query;

  const competitions = await ScheduleController.getAllCompetitionsForTeam(divisionId, parseInt(teamId));
  res.json(competitions);
});

app.get('/standings', async (req, res) => {
  const { divisionId } = req.query;

  const standingsData = await StandingsController.getStandingsForTeam(divisionId);
  res.json(standingsData);
});

app.get('/foo', (req, res) => {
  res.send('checkmate');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));