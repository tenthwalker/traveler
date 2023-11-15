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
const departInput = document.querySelector('#departDate');
const durationInput = document.querySelector('#tripDuration');
const headcountInput = document.querySelector('#headcount');
const destInput = document.querySelector('#tripDest');
const requestButton = document.querySelector('#submitRequest');
const priceBlock = document.querySelector('#costDisplay');
const annualSpend = document.querySelector('#annual');

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
    pastTrips.innerHTML += `<p>Destination: ${trip.destination.destination}</p><p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p><img src=${trip.destination.image} alt=${trip.destination.alt}>`
  })
}

function futureDisplay(futureArray) {
  futureTrips.innerHTML = ''
  futureTrips.innerHTML += '<h2>Future Trips</h2>'
  futureArray.forEach((trip)=>{  
    futureTrips.innerHTML += `<p>Destination: ${trip.destination.destination}</p><p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p><img src=${trip.destination.image} alt=${trip.destination.alt}>`
  })
}

function pendingDisplay(pendingArray) {
  pendingTrips.innerHTML = ''
  pendingTrips.innerHTML += '<h2>Pending Trips</h2>'
  pendingArray.forEach((trip)=>{  
    pendingTrips.innerHTML += `<p>Destination: ${trip.destination.destination}</p><p>Guests: ${trip.travelers}</p><p>Departure: ${trip.date}</p><img src=${trip.destination.image} alt=${trip.destination.alt}>`
  })
}

function populateDropdown(destArray) {
  destArray.forEach(dest => {
    const newOption = document.createElement("option")
    newOption.textContent = `${dest.destination}`
    newOption.value = `${dest.id}`
    destInput.appendChild(newOption)
  })
}

function showPrice(totalCost) {
  priceBlock.innerHTML = ''
  priceBlock.innerHTML = `Proposed trip cost: $${totalCost}`
}

function showAnnual(annualSpendTotal) {
  annualSpend.innerHTML = `This year's spend (inclusive of 10% agent fee): ${annualSpendTotal}`
}

export {
  loginButton,
  usernameField,
  passwordField,
  loginView,
  mainView,
  showAnnual,
  pendingTrips,
  priceBlock,
  pastTrips,
  annualSpend,
  futureTrips,
  tripView,
  totalSpent,
  departInput,
  durationInput, 
  destInput,
  headcountInput,
  showPrice,
  requestButton,
  displayTrips,
  pastDisplay,
  futureDisplay,
  pendingDisplay,
  populateDropdown
}