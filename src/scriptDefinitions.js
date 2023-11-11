////////

const { usernameField, passwordField, loginView, mainView } = require("./domUpdates");

function loginAttempt(){
  if(usernameField.value && passwordField.value === 'travel'){
    const usernameGiven = usernameField.value;
    loginView.classList.add('hidden');
    mainView.classList.remove('hidden');
  } else {
    alert('Please verify that you have entered a correct username and password before trying again.');
    usernameField.innerHTML = '';
    passwordField.innerHTML = '';
  }
}

// fetch call for all users on page load
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
}