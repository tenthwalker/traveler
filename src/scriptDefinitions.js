////////global variables
// let userID;

const {
  // allTravelers,
  getTrips,
  getDestinations,
  postTrip,
  fetchAllGET
} = require('./apiCalls');

const {  
  loginButton,
  usernameField,
  passwordField,
  loginView,
  mainView, 
} = require("./domUpdates");

function loginAttempt(){
    let usernameRegularExp = /^(traveler([1-9]|[1-4][0-9]|50))$/;
    if (usernameRegularExp.test(usernameField.value) && passwordField.value === 'travel') {
      let userID = usernameField.value.match(/^traveler([1-9]|[1-4][0-9]|50)$/)[1]
      userID = parseInt(userID)
      fetchAllGET().then((allTravelers)=>{
        createFilter(allTravelers, userID)
      });
      loginView.classList.add('hidden');
      mainView.classList.remove('hidden');
  } else {
    alert('Please verify that you have entered a correct username and password before trying again.');
    usernameField.innerHTML = '';
    passwordField.innerHTML = '';
  }
}

function createFilter(allTravelers, userID) {
  const justUser = allTravelers[0].travelers.filter((traveler)=> {
    return traveler.id===userID
  })    
// user matching traveler taken in from username field
  return justUser
}

// grab user ids for all users
// take in login fields data
// filter through user ids for all users, check if usernameField.value is equal to 'traveler' + user id 
// check if username is traveler<id>
// check if password is travel
// if both true, addClassList.hidden to the login page and remove it from the dashboard
// if not, alert('Please verify that your username and password are correct before trying again.)
// clear out login fields

module.exports = {
  loginAttempt,
  createFilter
}