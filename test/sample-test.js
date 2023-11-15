import chai from 'chai';
const expect = chai.expect;

////dataset/////
let userID, travelers, traveler, trips, destinations;
beforeEach(()=>{
  userID = 1
  travelers = [{
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
    },
    {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
  }]

  traveler ={
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
  }

  trips = [{
    "id": 117,
    "userID": 1,
    "destinationID": 28,
    "travelers": 3,
    "date": "2021/01/09",
    "duration": 15,
    "status": "approved",
    "suggestedActivities": []
  }]

  destinations = [{
    "id": 28,
    "destination": "San Juan, Puerto Rico",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 900,
    "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
    "alt": "white and brown concrete buildings near sea under white clouds during daytime"
    },
    {
      "id": 10,
      "destination": "Toronto, Canada",
      "estimatedLodgingCostPerDay": 90,
      "estimatedFlightCostPerPerson": 450,
      "image": "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
    },
    {
      "id": 7,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 395,
      "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "city during the day time with eiffel tower"
    }]
})


//////functions///////

function completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations){
  let destinationsToDisplay = []
  currentUser = filterTravs(allTravelers, userID)
  const filteredTrips = filterTrips(allTrips, userID)
  const filteredDests = filterDestinations(filteredTrips, allDestinations, destinationsToDisplay)
  const fullUser = {
    ...currentUser,
    tripData: filteredDests || []
  }
  console.log(fullUser, "fullUser")
  return fullUser
}

function filterTravs(allTravelers, userID) {
  const justUser = allTravelers.filter((traveler)=> {
    return traveler.id===userID
  })
  return justUser[0]
}

function filterTrips(allTrips, userID) {
  const justTrips = allTrips.filter((trip)=> {
    return trip.userID===userID
  })
  return justTrips
}

function filterDestinations(filteredTrips, allDestinations, destinationsToDisplay) {
  filteredTrips.forEach((trip)=>{
    const matchedTrips = allDestinations.find((destination)=>{
      return destination.id === trip.destinationID
    })
    trip.destination = matchedTrips
    destinationsToDisplay.push(matchedTrips)
    return destinationsToDisplay
  })
return filteredTrips
}

function sortTrips(fullLoggedInUser, pastToDisplay, futureToDisplay, pendingToDisplay){
  dateToday = new Date();
  fullLoggedInUser.tripData.forEach((trip)=>{
    const tripDateDeparted = new Date(trip.date)
    if (trip.status === 'approved') {
      if (tripDateDeparted > dateToday) {
        futureToDisplay.push(trip)
        return futureToDisplay
      } else {
        pastToDisplay.push(trip)
        return pastToDisplay
      }
    } else {
      pendingToDisplay.push(trip)
      return pendingToDisplay
    }
  }) 
  return fullLoggedInUser.tripData = {
    past: pastToDisplay,
    pending: pendingToDisplay,
    future: futureToDisplay
  }
}

function makeNewTrip(allTrips, userID, departInput, durationInput, destInput, headcountInput) {
  newTrip = {
    id: allTrips.length+1,
    userID: userID,
    destinationID: parseInt(destInput.value),
    travelers: parseInt(headcountInput.value),
    date: departInput.value,
    duration: parseInt(durationInput.value),
    status: "pending",
    suggestedActivities: [],
  }
  dateToday = new Date();
  const newTripDate = new Date(newTrip.date)
  if(dateToday < newTripDate){
    return newTrip
  }
}

function findEstimatedCost(newTrip, allDestinations) {
  if(departInput.value && durationInput.value && destInput.value && headcountInput.value){
    let totalCost;
    const destProposed = allDestinations.find((destination)=>{
      return destination.id === newTrip.destinationID
    })
    totalCost = ((newTrip.travelers * destProposed.estimatedFlightCostPerPerson) + (destProposed.estimatedLodgingCostPerDay * newTrip.duration));
    return totalCost += (totalCost * .1);
  }
}

function formatDate(date) {
  formattedDate = date.getFullYear() + "/" + (date.getMonth() + 1 ) + "/" + date.getDate();
  return formattedDate;
}

function findAnnualSpend(fullLoggedInUser) {
  let totalCost = 0;
  dateToday = formatDate(new Date()).split('/')
  const userTrips = fullLoggedInUser.tripData.pending.filter((trip)=>{
    const tripDate = new Date(trip.date);
  return checkTripYear(tripDate, 2023);
  });
  userTrips.forEach((trip) => {
    const tripComboCost = calculateTripCost(trip)
    totalCost += tripComboCost;
  });
  return totalCost;
}

function calculateTripCost(trip) {
  const flightPP = trip.destination.estimatedFlightCostPerPerson
  const lodgingPD = trip.destination.estimatedLodgingCostPerDay
  const travelers = trip.travelers
  const duration = trip.duration
  let tripCost = (travelers * flightPP) + (travelers * lodgingPD * duration) * 1.1
  return tripCost
}

function checkTripYear(formattedDate, year) {
  return formattedDate.getFullYear() === year
}

//////tests/////

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});


describe('completeCurrentUser', function(){
  it('should return a user object with filtered trips and destinations', () => {
    const currentUser = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    };

    const allTrips = trips;
    const allTravelers = travelers;
    const allDestinations = destinations;

    const result = completeCurrentUser(currentUser, allTrips, allTravelers, allDestinations);

    expect(result).to.deep.equal({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
      tripData: [{
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: [],
        destination: {
          "id": 28,
          "destination": "San Juan, Puerto Rico",
          "estimatedLodgingCostPerDay": 70,
          "estimatedFlightCostPerPerson": 900,
          "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
          "alt": "white and brown concrete buildings near sea under white clouds during daytime"
        }
      }]
    });
  });
});

describe('filterTravs', function(){
  it('should return the user with a specified ID', () => {
    const result = filterTravs(travelers, userID);

    expect(result).to.deep.equal({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    });
  });

  it('should return undefined for a userID outside the given array', () => {
    const result = filterTravs(travelers, 3);

    expect(result).to.be.undefined;
  });
})

describe('filterTrips', function(){
  it('should return trips for a specified userID', () => {
    const result = filterTrips(trips, userID);

    expect(result).to.deep.equal([
      {
        "id": 117,
        "userID": 1,
        "destinationID": 28,
        "travelers": 3,
        "date": "2021/01/09",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": []
      }
    ]);
  });

  it('should return an empty array if the filter does not find a matching ID', () => {
    const result = filterTrips(trips, 3);

    expect(result).to.deep.equal([]);
  });
})

describe('filterDestinations', function(){
  it('should add destination info to each trip in the filteredTrips array', () => {
    const filteredTrips = [...trips];
    const destinationsToDisplay = [];
    
    filterDestinations(filteredTrips, destinations, destinationsToDisplay);

    expect(filteredTrips).to.deep.equal([
      {
        "id": 117,
        "userID": 1,
        "destinationID": 28,
        "travelers": 3,
        "date": "2021/01/09",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": [],
        "destination": {
          "id": 28,
          "destination": "San Juan, Puerto Rico",
          "estimatedLodgingCostPerDay": 70,
          "estimatedFlightCostPerPerson": 900,
          "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
          "alt": "white and brown concrete buildings near sea under white clouds during daytime"
        }
      }
    ]);

    expect(destinationsToDisplay).to.deep.equal([
      {
        "id": 28,
        "destination": "San Juan, Puerto Rico",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 900,
        "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        "alt": "white and brown concrete buildings near sea under white clouds during daytime"
      }
    ]);
  });

 it('should add destination info to each trip in the filteredTrips array', () => {
    const filteredTrips = [...trips];
    const destinationsToDisplay = [];
    
    filterDestinations(filteredTrips, destinations, destinationsToDisplay);

    expect(filteredTrips).to.deep.equal([
      {
        "id": 117,
        "userID": 1,
        "destinationID": 28,
        "travelers": 3,
        "date": "2021/01/09",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": [],
        "destination": {
          "id": 28,
          "destination": "San Juan, Puerto Rico",
          "estimatedLodgingCostPerDay": 70,
          "estimatedFlightCostPerPerson": 900,
          "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
          "alt": "white and brown concrete buildings near sea under white clouds during daytime"
        }
      }
    ]);

    expect(destinationsToDisplay).to.deep.equal([
      {
        "id": 28,
        "destination": "San Juan, Puerto Rico",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 900,
        "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        "alt": "white and brown concrete buildings near sea under white clouds during daytime"
      }
    ]);
  });
});

// describe('sortTrips', function(){})

// describe('makeNewTrip', function(){})

// describe('findEstimatedCost', function(){})

// describe('formatDate', function(){})

// describe('findAnnualSpend', function(){})

// describe('calculateTripCost', function(){})

// describe('checkTripYear', function(){})
