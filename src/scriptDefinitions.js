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
    fetchAllGET()
    .then((allTrips)=>{
      currentUserTrips = filterTrips(allTrips, userID)
      return currentUserTrips
      })
      .then((currentUserTrips) => {
        sortedTrips = sortTrips(currentUserTrips, pastToDisplay, futureToDisplay, pendingToDisplay)
        return sortedTrips
      })
    loginView.classList.add('hidden');
    mainView.classList.remove('hidden');
  } else {
    alert('Please verify that you have entered a correct username and password before trying again.');
    usernameField.innerHTML = '';
    passwordField.innerHTML = '';
  }
}

// function filterTravs(allTravelers, userID) {
//   console.log(allTravelers)
//   const justUser = allTravelers[0].filter((traveler)=> {
//     return traveler.id===userID
//   })    
//   console.log(justUser[0])
//   return justUser[0]
// }

function filterTrips(allTrips, userID) {
  console.log(allTrips)
  const justTrips = allTrips[0].filter((trip)=> {
    return trip.userID===userID
  })    
  console.log(justTrips, "justTrips")
  return justTrips
}

function sortTrips(currentUserTrips, pastToDisplay, futureToDisplay, pendingToDisplay){
  const dateToday = new Date();
  const trips = currentUserTrips.forEach((trip)=>{
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
  displayTrips(pastToDisplay, pendingToDisplay, futureToDisplay)
}

//iterate through currentUserTrips, check for dates before date.now and with status approved and return those for pastDisplay
// check for dates after date.now and with status approved and return those for futureDisplay
// check for status pending and return those for pendingDisplay

module.exports = {
  loginAttempt,
  // filterTravs,
  sortTrips,
  filterTrips,
  pastToDisplay,
  pendingToDisplay,
  futureToDisplay
}