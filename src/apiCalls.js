/////////Global Variables////////
let allTravelers;
let allTrips;
let allDestinations;

//////////GET Travelers//////////
function getTravelers() {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not get travelers. Request code: ${response.status}`)
    } 
    return response.json()
  })
  .then((data) => {
    allTravelers = data.travelers
    return allTravelers
  })
  .catch(error => {
    alert(error.message);
    console.log(error);
  });
}

////////////GET Trips////////////
function getTrips() {
  return fetch('http://localhost:3001/api/v1/trips')
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not get trips. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    allTrips = data.trips
    return allTrips
  })
  .catch(error => {
    alert(error.message);
    console.log(error);
  });
}

////////GET Destinations/////////
function getDestinations() {
  return fetch('http://localhost:3001/api/v1/destinations')
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not get destinations. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    allDestinations = data.destinations
    return allDestinations
  })
  .catch(error => {
    alert(error.message);
    console.log(error);
  });
}

////////POST Trip/////////
function postTrip(newTrip) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTrip)
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not post new trip. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then((addedTrip) => {
    return getTrips()
  })
  .catch(error => {
    alert(error.message);
    console.log(error);
  });
}

/////Fetch all GET data/////
function fetchAllGET() {
  return Promise.all([
    getTravelers(),
    getTrips(),
    getDestinations()
  ])
}

export {
  allTravelers,
  allTrips,
  allDestinations,
  postTrip,
  fetchAllGET
}