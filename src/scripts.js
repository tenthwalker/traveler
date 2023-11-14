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
  sortTrips,
  filterTrips,
  currentUser,
  pastToDisplay,
  pendingToDisplay,
  futureToDisplay,  
  completeCurrentUser,
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
  displayTrips,
  pastDisplay,
  futureDisplay,
  pendingDisplay, } from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
////////Event Listeners/////////

loginButton.addEventListener('click', () => {
  fetchAllGET()
    .then((data)=>{
      loginAttempt()
      const fullLoggedInUser = completeCurrentUser(currentUser, allTrips, allTravelers)
      console.log(fullLoggedInUser, "full logged in user")
      sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay)
      console.log(fullLoggedInUser, "sorted data full user")
      displayTrips(fullLoggedInUser.tripData.past, fullLoggedInUser.tripData.future, fullLoggedInUser.tripData.pending)
      
      })

});

