const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

const launchesRotuter = express.Router();



launchesRotuter.get('/', httpGetAllLaunches);
launchesRotuter.post('/', httpAddNewLaunch);
launchesRotuter.delete(`/:id`, httpAbortLaunch)

module.exports = launchesRotuter;