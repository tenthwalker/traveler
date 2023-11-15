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
  pendingToDisplay,
  futureToDisplay,  
  findAnnualSpend,
  completeCurrentUser,
  makeNewTrip,
} from './scriptDefinitions';

import {  
  loginButton,
  usernameField,
  passwordField,
  loginView,
  priceBlock,
  mainView,
  pendingTrips,
  pastTrips,
  futureTrips,
  tripView,
  showAnnual,
  annualSpend,
  showPrice,
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
      findAnnualSpend(fullLoggedInUser)
      return fullLoggedInUser
    })
});

departInput.addEventListener('input', () => {
   showPrice(findEstimatedCost(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput), allDestinations))
});
destInput.addEventListener('input', () => {
  showPrice(findEstimatedCost(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput), allDestinations))
});
headcountInput.addEventListener('input', () => {
  showPrice(findEstimatedCost(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput), allDestinations))
});
durationInput.addEventListener('input', () => {
  showPrice(findEstimatedCost(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput), allDestinations))
});

requestButton.addEventListener('click', () => {
  fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations)
  postTrip(makeNewTrip(allTrips, fullLoggedInUser.id, departInput, durationInput, destInput, headcountInput))
  .then(addedData => {
    fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations)
    sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay)
    displayTrips(fullLoggedInUser.tripData.past, fullLoggedInUser.tripData.future, fullLoggedInUser.tripData.pending)
    findAnnualSpend(fullLoggedInUser)
    destInput.value = ''
    headcountInput.value = ''
    departInput.value = ''
    durationInput.value = ''
    costDisplay.innerHTML = 'Proposed trip cost: $'
  })
  .catch(error => {
    alert("Something went wrong: failed to post new trip.")
    console.log(error)
  })
})