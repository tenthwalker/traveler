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
function displayTrips(pastArray, futureArray, pendingArray) {
  pastDisplay(pastArray);
  futureDisplay(futureArray);
  pendingDisplay(pendingArray);
  }

function pastDisplay(pastArray) {
  pastTrips.innerHTML = ''
  pastTrips.innerHTML = `<h2>Past Trips</h2><p>Guests: ${pastArray.travelers}</p><p>Departure: ${pastArray.date}</p><p>Destination: ${pastArray.destinationID}</p>`
}

function futureDisplay(futureArray) {
  futureTrips.innerHTML = ''
  futureTrips.innerHTML = `<h2>Future Trips</h2><p>Guests: ${futureArray.travelers}</p><p>Departure: ${futureArray.date}</p><p>Destination: ${futureArray.destinationID}</p>`
}

function pendingDisplay(pendingArray) {
  pendingTrips.innerHTML = ''
  pendingTrips.innerHTML = `<h2>Pending Trips</h2><p>Guests: ${pendingArray.travelers}</p><p>Departure: ${pendingArray.date}</p><p>Destination: ${pendingArray.destinationID}</p>`
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