const express = require('express');
const cors = require('cors');

const api = require('./src/api');

const app = express();
const port = 5000;

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
  const teams = await api.getTeamsFromDivisionId(divisionId);
  res.json(teams);
});

app.get('/teams', async (req, res) => {
  const { divisionId, teamId } = req.query;

  const competitions = await api.getAllCompetitionsForTeam(divisionId, parseInt(teamId));
  res.json(competitions);
});

app.listen(port, () => console.log(`listening on ${port}`));