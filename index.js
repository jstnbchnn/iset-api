const express = require('express');
const cors = require('cors');

const ScheduleController = require('./src/ScheduleController');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const divisions = await api.getAllDivisions();
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));