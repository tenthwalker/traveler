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
  totalSpent
}