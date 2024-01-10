var artistForm = document.getElementById('artist-search')
var artistInput = document.getElementById(`artist-input`)
var cityStateForm = document.getElementById(`city-state-search`)
var cityInput = document.getElementById(`city-input`)
var stateInput = document.getElementById(`state-input`)
var eName = document.getElementById('eName');
var eDateTime = document.getElementById('eDateTime');
var eCity = document.getElementById('eCity');
var eVenue = document.getElementById('eVenue');
var artName = document.getElementById('artName');
var artGenre = document.getElementById('artGenre');
var artRecent = document.getElementById('artRecent');
var ticketMasterKey = `6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik`
// TODO: If time permits add city search functionality
// var cityEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&locale=*&sort=date,asc&city=Dallas&stateCode=TX&classificationName=music`

function artistSearch(event) {
    event.preventDefault();
    
    var searchedArtist= artistInput.value.trim()
    console.log(searchedArtist);
    var artistEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&keyword=${searchedArtist}&locale=*&sort=date,asc&classificationName=music`
    

    fetch(artistEvents)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })
}

function cityStateSearch(event) {
    event.preventDefault();
    
    var searchedCity= cityInput.value.trim()
    console.log(searchedCity);
    var selectedState= stateInput.value
    console.log(selectedState);
    var locationEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik&locale=*&sort=date,asc&city=${searchedCity}&stateCode=${selectedState}&classificationName=music`
    

    fetch(locationEvents)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
    })
}


// TODO: If time permits add city search functionality
// fetch(cityEvents)
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log(data);
// })

artistForm.addEventListener(`submit`, artistSearch)
cityStateForm.addEventListener(`submit`, cityStateSearch)