const axios = require('axios');

const launchesDatabase = require("./launches.mongo");
const planet = require("./planets.mongo")

const DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
    console.log("Downloading launch data...");
    const respone = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1,
                    }
                }, {
                    path: "payloads",
                    select: {
                        customers: 1,
                    }
                }
            ]
        }
    })
    if (respone.status !== 200) {
        console.log("Download failed");
        throw new Error("Launch downloaded data failed");
    }

    const launchDocs = respone.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc["payloads"]
        const customers = payloads.flatmap((payload) => {
            return payload["customers"];
        })
    }

    const launch = {
        flightNumber: launchDoc["flightNumber"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers,
    }

    await saveLaunch(launch)
}

async function loadlaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'Falcon Sat',
    });
    if (firstLaunch) console.log('Launch data already loaded');
    else await populateLaunches();
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
        flightNumber: launchId,
    })
}

async function getLastestFlightNumber() {
    const lastestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
    if (!lastestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return lastestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
    return await launchesDatabase
        .find({}, { '_id': 0, 'v': 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })
    if (!planet) {
        throw new Error('No matching planet found');
    }
    const newFlightNumber = await getLastestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });
    await saveLaunch(newLaunch);
}
async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    loadlaunchData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}