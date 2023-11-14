/////////Query Selectors///////
const loginButton = document.querySelector('#submitLogin');
const usernameField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const loginView = document.querySelector('#login');
const mainView = document.querySelector('#dashboard');
const tripView = document.querySelector('.overview');
const pastTrips = document.querySelector('#pastTrips');
const futureTrips = document.querySelector('#futureTrips');
const pendingTrips = document.querySelector('#pendingTrips');
const totalSpent = document.querySelector('#totalSpent');


///////Update Functions////////
function displayTrips(past, pending, future) {
  
}

function pastDisplay(pastToDisplay) {
  pastTrips.innerHTML = ''
  pastTrips.innerHTML = `<h2>Past Trips</h2><p>${pastToDisplay}</p>`
}

function futureDisplay(futureToDisplay) {
  futureTrips.innerHTML = ''
  futureTrips.innerHTML = `<h2>Future Trips</h2><p>${futureToDisplay}</p>`
}

function pendingDisplay(pendingToDisplay) {
  pendingTrips.innerHTML = ''
  pendingTrips.innerHTML = `<h2>Pending Trips</h2><p>${pendingToDisplay}</p>`
}

export {
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
}