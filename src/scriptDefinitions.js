////////global variables
let currentUser;

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
      currentUser = createFilter(allTravelers, userID)
        // display info on dashboard for currentUser, using userID to filter through allTrips to find matching userIDs
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
  console.log(allTravelers)
  const justUser = allTravelers[0].filter((traveler)=> {
    return traveler.id===userID
  })    
  console.log(justUser[0])
// user matching traveler taken in from username field
  return justUser[0]
}



module.exports = {
  loginAttempt,
  createFilter
}