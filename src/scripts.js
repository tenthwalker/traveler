// This is the JavaScript entry file - your code begins here

////////////Imports/////////////
import './css/styles.css';

import {  
  allTravelers,
  allTrips,
  allDestinations,
  postTrip,
  fetchAllGET
} from './apiCalls';

import {
  loginAttempt,
  filterTravs,
  newTrip,
  sortTrips,
  filterTrips,
  currentUser,
  userID,
  pastToDisplay,
  filterDestinations,
  findEstimatedCost,
  findAnnualSpend,
  pendingToDisplay,
  futureToDisplay,  
  completeCurrentUser,
  makeNewTrip,
} from './scriptDefinitions';

import {  
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
  departInput,
  durationInput, 
  destInput,
  headcountInput,
  requestButton,
  displayTrips,
  pastDisplay,
  futureDisplay,
  pendingDisplay,
  populateDropdown, } from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let fullLoggedInUser;
////////Event Listeners/////////

loginButton.addEventListener('click', () => {
  fetchAllGET()
    .then((data)=>{
      loginAttempt()
      fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations)
      console.log(fullLoggedInUser, "userID")
      // console.log(fullLoggedInUser, "full logged in user")
      sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay)
      // console.log(fullLoggedInUser, "sorted data full user")
      displayTrips(fullLoggedInUser.tripData.past, fullLoggedInUser.tripData.future, fullLoggedInUser.tripData.pending)
      populateDropdown(allDestinations)
      return fullLoggedInUser
    })
});

requestButton.addEventListener('click', () => {
  fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations)
  postTrip(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput))
  .then(addedData => {
    fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations)
    sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay)
    displayTrips(fullLoggedInUser.tripData.past, fullLoggedInUser.tripData.future, fullLoggedInUser.tripData.pending)
    destInput.value = ''
    headcountInput.value = ''
    departInput.value = ''
    durationInput.value = ''
  })
  .catch(error => {
    alert("Something went wrong: failed to post new trip.")
    console.log(error)
  })
})