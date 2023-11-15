////////global variables
let currentUser;
let userID;
let destinationsToDisplay = [];
let pastToDisplay = [];
let futureToDisplay = [];
let pendingToDisplay = [];

const {
  allTravelers,
  getTrips,
  getDestinations,
  postTrip,
  fetchAllGET,
  allDestinations
} = require('./apiCalls');

const {  
  loginButton,
  usernameField,
  passwordField,
  loginView,
  mainView,
  pendingTrips,
  pastTrips,
  futureTrips,
  tripView,
  totalSpent,
  displayTrips,
  pastDisplay,
  futureDisplay,
  pendingDisplay,
} = require("./domUpdates");



function loginAttempt(){
  let usernameID = usernameField.value.split('traveler');
  if (usernameField.value === 'traveler' + usernameID[1] && passwordField.value === 'travel') {
    userID = parseInt(usernameID[1])
    loginView.classList.add('hidden');
    mainView.classList.remove('hidden');
  } else {
    alert('Please verify that you have entered a correct username and password before trying again.');
    usernameField.innerHTML = '';
    passwordField.innerHTML = '';
  }
}

function completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations){
  currentUser = filterTravs(allTravelers, userID)
  const filteredTrips = filterTrips(allTrips, userID)
  const filteredDests = filterDestinations(filteredTrips, allDestinations, destinationsToDisplay)
  const fullUser = {
    ...currentUser,
    tripData: filteredDests || []
  }
  console.log(fullUser, "fullUser")
  return fullUser
}

function filterTravs(allTravelers, userID) {
  const justUser = allTravelers.filter((traveler)=> {
    return traveler.id===userID
  })
  return justUser[0]
}

function filterTrips(allTrips, userID) {
  const justTrips = allTrips.filter((trip)=> {
    return trip.userID===userID
  })
  console.log(justTrips, "justTrips")
  // need to get just the trips that match the userID
  //then need to get the destinations matching the trip id and add those to the fullUser filteredTrips data
  return justTrips
}

function filterDestinations(filteredTrips, allDestinations, destinationsToDisplay) {
  //forEach filtered trips, check for matching destination ID to allDestinations with a filter
  filteredTrips.forEach((trip)=>{
    const matchedTrips = allDestinations.find((destination)=>{
      return destination.id === trip.destinationID
    })
    trip.destination = matchedTrips
    destinationsToDisplay.push(matchedTrips)
    return destinationsToDisplay
  })
  console.log(filteredTrips, "filteredTrips")
console.log(destinationsToDisplay, "destinationsToDisplay")
return filteredTrips
}

function sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay){
  const dateToday = new Date();
  fullLoggedInUser.tripData.forEach((trip)=>{
    const tripDateDeparted = new Date(trip.date)
    if (trip.status === 'approved') {
      if (tripDateDeparted > dateToday) {
        futureToDisplay.push(trip)
        return futureToDisplay
      } else {
        pastToDisplay.push(trip)
        return pastToDisplay
      }
    } else {
      pendingToDisplay.push(trip)
      return pendingToDisplay
    }
  }) 
  return fullLoggedInUser.tripData = {
    past: pastToDisplay,
    pending: pendingToDisplay,
    future: futureToDisplay
  }
}

module.exports = {
  loginAttempt,
  filterTravs,
  sortTrips,
  filterDestinations,
  filterTrips,
  currentUser,
  destinationsToDisplay,
  pastToDisplay,
  pendingToDisplay,
  futureToDisplay,  
  completeCurrentUser,
}