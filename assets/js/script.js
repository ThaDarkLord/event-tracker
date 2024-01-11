var artistForm = document.getElementById("artist-search");
var artistInput = document.getElementById(`artist-input`);
var cityStateForm = document.getElementById(`city-state-search`);
var cityInput = document.getElementById(`city-input`);
var stateInput = document.getElementById(`state-input`);
var eName = document.getElementById("eName");
var eDateTime = document.getElementById("eDateTime");
var eCity = document.getElementById("eCity");
var eVenue = document.getElementById("eVenue");
var artName = document.getElementById("artName");
var artGenre = document.getElementById("artGenre");
var artRecent = document.getElementById("artRecent");

var eventNameDisplay = document.getElementById("event-name");
var eventDateTime = document.getElementById("date-time");
var eventCityDisplay = document.getElementById("event-city");
var eventVenueDisplay = document.getElementById("event-venue");

var modal = document.querySelector(`.modal`);
var modalButton = document.querySelector(`.modal-close`);

var ticketMasterKey = `6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik`;
// TODO: If time permits add city search functionality
// var cityEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&locale=*&sort=date,asc&city=Dallas&stateCode=TX&classificationName=music`

function artistSearch(event) {
  event.preventDefault();

  var searchedArtist = artistInput.value.trim();
  console.log(searchedArtist);
  var artistEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&keyword=${searchedArtist}&locale=*&sort=date,asc&classificationName=music`;

  fetch(artistEvents)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (!data._embedded) {
        modal.classList.add("is-active");

        modalButton.addEventListener(`click`, function () {
          modal.classList.remove("is-active");
        });
      } else {
        eventNameDisplay.textContent =
          "Event Name: " + data._embedded.events[0].name;
        eventDateTime.textContent =
          "Date/Time: " + data._embedded.events[0].dates.start.dateTime;
        eventCityDisplay.textContent =
          "City: " +
          data._embedded.events[0]._embedded.venues[0].city.name +
          ", " +
          data._embedded.events[0]._embedded.venues[0].state.stateCode;
        eventVenueDisplay.textContent =
          "City: " + data._embedded.events[0]._embedded.venues[0].name;
      }
    });
}

function cityStateSearch(event) {
  event.preventDefault();

  var searchedCity = cityInput.value.trim();
  console.log(searchedCity);
  var selectedState = stateInput.value;
  console.log(selectedState);
  var locationEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik&locale=*&sort=date,asc&city=${searchedCity}&stateCode=${selectedState}&classificationName=music`;

  fetch(locationEvents)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// TODO: If time permits add city search functionality
// fetch(cityEvents)
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log(data);
// })

artistForm.addEventListener(`submit`, artistSearch);
cityStateForm.addEventListener(`submit`, cityStateSearch);
