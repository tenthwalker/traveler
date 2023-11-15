import chai from 'chai';
const expect = chai.expect;

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

let userID = 1
let travelers = [{
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer"
    },
    {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker"
}]

let traveler ={
  id: 1,
  name: "Ham Leadbeater",
  travelerType: "relaxer"
}

let trips = [{
  "id": 117,
  "userID": 1,
  "destinationID": 28,
  "travelers": 3,
  "date": "2021/01/09",
  "duration": 15,
  "status": "approved",
  "suggestedActivities": []
}]

let destinations = [{
    id: 1,
    destination: "Lima, Peru",
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    alt: "overview of city buildings with a clear sky"
    },
    {
    id: 2,
    destination: "Stockholm, Sweden",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "city with boats on the water during the day time"
    },
    {
    id: 3,
    destination: "Sydney, Austrailia",
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    alt: "opera house and city buildings on the water with boats"
}]

