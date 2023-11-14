////////global variables
let currentUser;
let currentUserTrips;
let userID;
let sortedTrips;
let pastToDisplay = [];
let futureToDisplay = [];
let pendingToDisplay = [];

const {
  // allTravelers,
  getTrips,
  getDestinations,
  postTrip,
  fetchAllGET
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

function completeCurrentUser(currentUser, allTrips, allTravelers){
  currentUser = filterTravs(allTravelers, userID)
  const filteredTrips = filterTrips(allTrips, userID)
  const fullUser = {
    ...currentUser,
    tripData: filteredTrips || []
  }
  console.log(fullUser, "fullUser")
  return fullUser
}

function filterTravs(allTravelers, userID) {
  console.log(allTravelers, "allTrvaelers")
  const justUser = allTravelers.filter((traveler)=> {
    return traveler.id===userID
  })    
  console.log(justUser[0], "just user first value")
  //returns the object of the user matching the userID
  return justUser[0]
}

function filterTrips(allTrips, userID) {
  console.log(allTrips, "all trips")
  const justTrips = allTrips.filter((trip)=> {
    return trip.userID===userID
  })    
  console.log(justTrips, "justTrips")
  //returns an array of trips that match the userID
  return justTrips
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
  console.log(pastToDisplay)
  // displayTrips(pastToDisplay, pendingToDisplay, futureToDisplay)
}


module.exports = {
  loginAttempt,
  filterTravs,
  sortTrips,
  filterTrips,
  currentUser,
  pastToDisplay,
  pendingToDisplay,
  futureToDisplay,  
  completeCurrentUser,
 
}