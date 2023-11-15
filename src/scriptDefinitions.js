////////global variables
let currentUser;
let userID;
let destinationsToDisplay = [];
let pastToDisplay = [];
let futureToDisplay = [];
let newTrip;
let dateToday;
let pendingToDisplay = [];

const {
  allTravelers,
  allTrips,
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
  showPrice,
  tripView,
  totalSpent,
  departInput,
  durationInput, 
  destInput,
  headcountInput,
  requestButton,
  displayTrips,
  pastDisplay,
  futureDisplay,
  priceBlock,
  pendingDisplay,
  populateDropdown
} = require("./domUpdates");



function loginAttempt(){
  let usernameID = usernameField.value.split('traveler');
  userID = parseInt(usernameID[1])
  if (usernameField.value === 'traveler' + usernameID[1] && userID >= 1 && userID <= 50 && passwordField.value === 'travel') {
    loginView.classList.add('hidden');
    mainView.classList.remove('hidden');
    return userID
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
  return justTrips
}

function filterDestinations(filteredTrips, allDestinations, destinationsToDisplay) {
  filteredTrips.forEach((trip)=>{
    const matchedTrips = allDestinations.find((destination)=>{
      return destination.id === trip.destinationID
    })
    trip.destination = matchedTrips
    destinationsToDisplay.push(matchedTrips)
    return destinationsToDisplay
  })
return filteredTrips
}

function sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay){
  dateToday = new Date();
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

function makeNewTrip(allTrips, userID, departInput, durationInput, destInput, headcountInput) {
  newTrip = {
    id: allTrips.length+1,
    userID: userID,
    destinationID: parseInt(destInput.value),
    travelers: parseInt(headcountInput.value),
    date: departInput.value,
    duration: parseInt(durationInput.value),
    status: "pending",
    suggestedActivities: [],
  }
  dateToday = Date.now();
  const newTripDate = new Date(newTrip.date)
  if(dateToday < newTripDate){
    return newTrip
  // } else {
  //   alert("Please pick a date in the future for your trip.")
  }
}

function findEstimatedCost(newTrip, allDestinations) {
  if(departInput.value && durationInput.value && destInput.value && headcountInput.value){
    let totalCost;
    const destProposed = allDestinations.find((destination)=>{
      return destination.id === newTrip.destinationID
    })
    totalCost = ((newTrip.travelers * destProposed.estimatedFlightCostPerPerson) + (destProposed.estimatedLodgingCostPerDay * newTrip.duration));
    console.log(totalCost);
    return totalCost += (totalCost * .1);
  }
}

function findAnnualSpend() {
  //calculated from trips (split date and check for match against year data compared to dateToday) and 10% agent fee
}


module.exports = {
  loginAttempt,
  findAnnualSpend,
  filterTravs,
  newTrip,
  sortTrips,
  findEstimatedCost,
  userID,
  filterDestinations,
  filterTrips,
  currentUser,
  destinationsToDisplay,
  pastToDisplay,
  pendingToDisplay,
  futureToDisplay,  
  completeCurrentUser,
  makeNewTrip
}