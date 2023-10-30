const launches = new Map();

let latestFlightNumber = 1;

const launch = {
    flightNumber: 1,
    mission: "ABC",
    rocket: "abc",
    launchDate: new Date("Dec 27th, 2030"),
    target: "zzz",
    customer: ["a", "b", "c"],
    upcoming: true,
    success: true,
}
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch() {
    latestFlightNumber++;
    launches.set(
        launch.flightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ["A", "B"],
            success: true,
            upcoming: true,
        })
    );
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
}