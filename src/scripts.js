// This is the JavaScript entry file - your code begins here

////////////Imports/////////////
import './css/styles.css';

import {  getTravelers,
  getTrips,
  getDestinations,
  postTrip,
  fetchAllGET
} from './apiCalls';

import {
  loginAttempt,
  createFilter
} from './scriptDefinitions';

import {  
  loginButton,
  usernameField,
  passwordField,
  loginView,
  mainView, } from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
////////Event Listeners/////////

loginButton.addEventListener('click', loginAttempt);

