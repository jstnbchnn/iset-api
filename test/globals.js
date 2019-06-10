const AxiosMockAdapter = require('axios-mock-adapter');
const { setupAdapters } = require('./setupAdapters');

global.axios = require('axios');

var adapter = new AxiosMockAdapter(global.axios);
setupAdapters(adapter);
