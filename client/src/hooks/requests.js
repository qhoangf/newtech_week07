const API_URL = "http://localhost:8000"

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.

  const res = await fetch(`${API_URL}/planets`);
  return await res.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  const res = await fetch(`${API_URL}/launches`);
  const fetchedRes = await res.json();
  return fetchedRes.sort(function (previous, next) {
    return previous.flightNumber - next.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.

  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};