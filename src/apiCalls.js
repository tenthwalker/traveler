/////////Global Variables////////


//////////GET Travelers//////////
function getTravelers() {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not get travelers. Request code: ${response.status}`)
    } 
    return response.json()
  })
  .then((data) => data.travelers)
  .catch(error => {
    console.log(error);
  });
}

///////GET Traveler by ID////////


////////////GET Trips////////////
function getTrips() {
  return fetch('http://localhost:3001/api/v1/trips')
  .then((response) => {
    if (!response.ok) {
      throw Error(`Could not get trips. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => data.trips)
  .catch(error => {
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
  .then((data) => data.destinations)
  .catch(error => {
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
  .then(() => {
    return getTrips()
  })
  .catch(error => {
    console.log(error);
  });
}

export {
  getTravelers,
  getTrips,
  getDestinations,
  postTrip
}