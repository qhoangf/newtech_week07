const API_URL = "http://localhost:8000"

// Load planets and return as JSON.
async function httpGetPlanets() {
  const respone = await fetch(`${API_URL}/planets`);
  return await respone.json();
} 

async function httpGetLaunches() {
  const respone = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await respone.json();
  return fetchedLaunches.sort((a,b) =>{
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(error){
    return {
      ok: false,
    };
  } 
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(error){
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};