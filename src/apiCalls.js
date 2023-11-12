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
      throw Error(`Could not get travelers. Request code: ${response.status}`)
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
      throw Error(`Could not get travelers. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => data.destinations)
  .catch(error => {
    console.log(error);
  });
}

////////POST Destination/////////


///////////POST Trip/////////////


////////POST Update Trip/////////


export {
  getTravelers,
  getTrips,
  getDestinations,
  
}