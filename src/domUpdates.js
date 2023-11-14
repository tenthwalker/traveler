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
  console.log(pastArray, "pastArray param")
  pastDisplay(pastArray);
  futureDisplay(futureArray);
  pendingDisplay(pendingArray);
}

function pastDisplay(pastArray) {
  pastTrips.innerHTML = ''
  pastTrips.innerHTML += '<h2>Past Trips</h2>'
  pastArray.forEach((trip)=>{  
    pastTrips.innerHTML += `<p>Destination: ${trip.destinationID}</p><p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p>`
  })
}

function futureDisplay(futureArray) {
  futureTrips.innerHTML = ''
  futureTrips.innerHTML += '<h2>Future Trips</h2>'
  futureArray.forEach((trip)=>{  
    futureTrips.innerHTML += `<p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p><p>Destination: ${trip.destinationID}</p>`
  })
}

function pendingDisplay(pendingArray) {
  pendingTrips.innerHTML = ''
  pendingTrips.innerHTML += '<h2>Pending Trips</h2>'
  pendingArray.forEach((trip)=>{  
    pendingTrips.innerHTML += `<p>Destination: ${trip.destinationID}</p><p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p>`
  })
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