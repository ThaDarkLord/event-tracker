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
var eventFeed = document.getElementById(`eventFeed`)
var savedCards = document.getElementById(`savedCards`)

var eventNameDisplay = document.querySelectorAll(".event-name");
var eventDateTime = document.querySelectorAll(".date-time");
var eventCityDisplay = document.querySelectorAll(".event-city");
var eventVenueDisplay = document.querySelectorAll(".event-venue");

var modal = document.querySelector(`.modal`);
var modalButton = document.querySelector(`.modal-close`);
var savedEvents;


var ticketMasterKey = `6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik`;
// TODO: If time permits add city search functionality
// var cityEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&locale=*&sort=date,asc&city=Dallas&stateCode=TX&classificationName=music`

function artistSearch(event) {
    event.preventDefault();

    eventFeed.innerHTML = ``

    savedEvents = JSON.parse(localStorage.getItem(`savedEventsKey`))
    if(!savedEvents){
        savedEvents = [];
    }

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

                for (let i = 0; i < data._embedded.events.length; i++) {
                    // console.log(data._embedded.events[i]);

                    // *Container Article
                    var articleContainer = document.createElement(`article`)
                    articleContainer.setAttribute(`class`, `column is-8 buttonLink`)

                    // *Event Name Article
                    var eventNameArticle = document.createElement(`article`)
                    eventNameArticle.setAttribute(`class`, `card eName`)
                    var eventNameHeader = document.createElement(`header`)
                    eventNameHeader.setAttribute(`class`, `card-header`)
                    var eventNamePara = document.createElement(`p`)
                    eventNamePara.setAttribute(`class`, `card-header-title event-name`)


                    var eventDtArticle = document.createElement(`article`)
                    eventDtArticle.setAttribute(`class`, `card eName`)
                    var eventDtHeader = document.createElement(`header`)
                    eventDtHeader.setAttribute(`class`, `card-header`)
                    var eventDtPara = document.createElement(`p`)
                    eventDtPara.setAttribute(`class`, `card-header-title event-name`)


                    var eventCityArticle = document.createElement(`article`)
                    eventCityArticle.setAttribute(`class`, `card eName`)
                    var eventCityHeader = document.createElement(`header`)
                    eventCityHeader.setAttribute(`class`, `card-header`)
                    var eventCityPara = document.createElement(`p`)
                    eventCityPara.setAttribute(`class`, `card-header-title event-name`)

                    var eventVenueArticle = document.createElement(`article`)
                    eventVenueArticle.setAttribute(`class`, `card eName`)
                    var eventVenueHeader = document.createElement(`header`)
                    eventVenueHeader.setAttribute(`class`, `card-header`)
                    var eventVenuePara = document.createElement(`p`)
                    eventVenuePara.setAttribute(`class`, `card-header-title event-name`)


                    var eventSaveButton = document.createElement(`button`)
                    eventSaveButton.setAttribute(`class`, `button is-small is-primary`)
                    eventSaveButton.textContent = `Save Event`


                    // if (data._embedded.events[i] == data._embedded.events[2]) {
                    eventNamePara.textContent =
                        "Event Name: " + data._embedded.events[i].name;
                    eventDtPara.textContent =
                        "Date/Time: " + data._embedded.events[i].dates.start.dateTime;

                    if (!data._embedded.events[i]._embedded.venues[0].state) {
                        eventCityPara.textContent = "City: " + data._embedded.events[i]._embedded.venues[0].city.name
                    }
                    else {
                        eventCityPara.textContent = "City: " + data._embedded.events[i]._embedded.venues[0].city.name + ", " + data._embedded.events[i]._embedded.venues[0].state.stateCode;
                    }
                    eventVenuePara.textContent =
                        "Venue: " + data._embedded.events[i]._embedded.venues[0].name;


                    // var storedEName = data._embedded.events[0].name
                    // localStorage.setItem('EventName', storedEName)
                    // var storedEDate = data._embedded.events[0].dates.start.dateTime
                    // localStorage.setItem('EventDate', storedEDate)
                    // var storedELocation = data._embedded.events[0]._embedded.venues[0].city.name + data._embedded.events[0]._embedded.venues[0].state.stateCode
                    // localStorage.setItem('EventLocation', storedELocation)
                    // var storedEVenue = data._embedded.events[0]._embedded.venues[0].name
                    // localStorage.setItem('EventVenue', storedEVenue)


                    // }

                    eventNameArticle.appendChild(eventNameHeader)
                    eventNameArticle.appendChild(eventNamePara)

                    eventDtArticle.appendChild(eventDtHeader)
                    eventDtArticle.appendChild(eventDtPara)

                    eventCityArticle.appendChild(eventCityHeader)
                    eventCityArticle.appendChild(eventCityPara)

                    if (data._embedded.events[i]._embedded.venues[0].name) {
                        eventVenueArticle.appendChild(eventVenueHeader)
                        eventVenueArticle.appendChild(eventVenuePara)
                    } else {
                        console.log(`No Venue`);
                    }
                    articleContainer.append(eventNameArticle, eventDtArticle, eventCityArticle, eventVenueArticle, eventSaveButton)

                    eventFeed.append(articleContainer)

                    eventSaveButton.addEventListener (`click`, function(event) {
                        if(event.target.matches(`button`)){
                            console.log(event.target);

                            var storedEName = data._embedded.events[i].name
                            // localStorage.setItem('EventName', storedEName)
                            var storedEDate = data._embedded.events[i].dates.start.dateTime
                            // localStorage.setItem('EventDate', storedEDate)
                            var storedELocation = data._embedded.events[i]._embedded.venues[0].city.name + data._embedded.events[i]._embedded.venues[0].state.stateCode
                            // localStorage.setItem('EventLocation', storedELocation)
                            var storedEVenue = data._embedded.events[i]._embedded.venues[0].name
                            // localStorage.setItem('EventVenue', storedEVenue)
                            var currentEvent = {
                                name: storedEName,
                                date: storedEDate,
                                location: storedELocation,
                                venue: storedEVenue
                            };
                            console.log(currentEvent);
                            savedEvents.push(currentEvent)
                            localStorage.setItem(`savedEventsKey`, JSON.stringify(savedEvents))
                          }
                      

                    } )
                    

                }
            }
          });
        
}

function cityStateSearch(event) {
    event.preventDefault();

    eventFeed.innerHTML = ``

    savedEvents = JSON.parse(localStorage.getItem(`savedEventsKey`))
    if(!savedEvents){
        savedEvents = [];
    }

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

            for (let i = 0; i < data._embedded.events.length; i++) {
                // console.log(data._embedded.events[i]);

                // *Container Article
                var articleContainer = document.createElement(`article`)
                articleContainer.setAttribute(`class`, `column is-8 buttonLink`)

                // *Event Name Article
                var eventNameArticle = document.createElement(`article`)
                eventNameArticle.setAttribute(`class`, `card eName`)
                var eventNameHeader = document.createElement(`header`)
                eventNameHeader.setAttribute(`class`, `card-header`)
                var eventNamePara = document.createElement(`p`)
                eventNamePara.setAttribute(`class`, `card-header-title event-name`)


                var eventDtArticle = document.createElement(`article`)
                eventDtArticle.setAttribute(`class`, `card eName`)
                var eventDtHeader = document.createElement(`header`)
                eventDtHeader.setAttribute(`class`, `card-header`)
                var eventDtPara = document.createElement(`p`)
                eventDtPara.setAttribute(`class`, `card-header-title event-name`)


                var eventCityArticle = document.createElement(`article`)
                eventCityArticle.setAttribute(`class`, `card eName`)
                var eventCityHeader = document.createElement(`header`)
                eventCityHeader.setAttribute(`class`, `card-header`)
                var eventCityPara = document.createElement(`p`)
                eventCityPara.setAttribute(`class`, `card-header-title event-name`)

                var eventVenueArticle = document.createElement(`article`)
                eventVenueArticle.setAttribute(`class`, `card eName`)
                var eventVenueHeader = document.createElement(`header`)
                eventVenueHeader.setAttribute(`class`, `card-header`)
                var eventVenuePara = document.createElement(`p`)
                eventVenuePara.setAttribute(`class`, `card-header-title event-name`)


                var eventSaveButton = document.createElement(`button`)
                eventSaveButton.setAttribute(`class`, `button is-small is-primary`)
                eventSaveButton.textContent = `Save Event`


                // if (data._embedded.events[i] == data._embedded.events[2]) {
                eventNamePara.textContent =
                    "Event Name: " + data._embedded.events[i].name;
                eventDtPara.textContent =
                    "Date/Time: " + data._embedded.events[i].dates.start.dateTime;

                if (!data._embedded.events[i]._embedded.venues[0].state) {
                    eventCityPara.textContent = "City: " + data._embedded.events[i]._embedded.venues[0].city.name
                }
                else {
                    eventCityPara.textContent = "City: " + data._embedded.events[i]._embedded.venues[0].city.name + ", " + data._embedded.events[i]._embedded.venues[0].state.stateCode;
                }
                eventVenuePara.textContent =
                    "Venue: " + data._embedded.events[i]._embedded.venues[0].name;


                // var storedEName = data._embedded.events[0].name
                // localStorage.setItem('EventName', storedEName)
                // var storedEDate = data._embedded.events[0].dates.start.dateTime
                // localStorage.setItem('EventDate', storedEDate)
                // var storedELocation = data._embedded.events[0]._embedded.venues[0].city.name + data._embedded.events[0]._embedded.venues[0].state.stateCode
                // localStorage.setItem('EventLocation', storedELocation)
                // var storedEVenue = data._embedded.events[0]._embedded.venues[0].name
                // localStorage.setItem('EventVenue', storedEVenue)


                // }

                eventNameArticle.appendChild(eventNameHeader)
                eventNameArticle.appendChild(eventNamePara)

                eventDtArticle.appendChild(eventDtHeader)
                eventDtArticle.appendChild(eventDtPara)

                eventCityArticle.appendChild(eventCityHeader)
                eventCityArticle.appendChild(eventCityPara)

                if (data._embedded.events[i]._embedded.venues[0].name) {
                    eventVenueArticle.appendChild(eventVenueHeader)
                    eventVenueArticle.appendChild(eventVenuePara)
                } else {
                    console.log(`No Venue`);
                }
                articleContainer.append(eventNameArticle, eventDtArticle, eventCityArticle, eventVenueArticle, eventSaveButton)

                eventFeed.append(articleContainer)

                eventSaveButton.addEventListener (`click`, function(event) {
                    if(event.target.matches(`button`)){
                        console.log(event.target);

                        var storedEName = data._embedded.events[i].name
                        // localStorage.setItem('EventName', storedEName)
                        var storedEDate = data._embedded.events[i].dates.start.dateTime
                        // localStorage.setItem('EventDate', storedEDate)
                        var storedELocation = data._embedded.events[i]._embedded.venues[0].city.name + data._embedded.events[i]._embedded.venues[0].state.stateCode
                        // localStorage.setItem('EventLocation', storedELocation)
                        var storedEVenue = data._embedded.events[i]._embedded.venues[0].name
                        // localStorage.setItem('EventVenue', storedEVenue)
                        var currentEvent = {
                            name: storedEName,
                            date: storedEDate,
                            location: storedELocation,
                            venue: storedEVenue
                        };
                        console.log(currentEvent);
                        savedEvents.push(currentEvent)
                        localStorage.setItem(`savedEventsKey`, JSON.stringify(savedEvents))
                    }

                } )
                

            }


        });
}



artistForm.addEventListener(`submit`, artistSearch);
cityStateForm.addEventListener(`submit`, cityStateSearch);

function retrievSavedEvents(){
   JSON.parse(localStorage.getItem(savedEvents))
   for (var i = 0; i < savedEvents.length; i++) {
    console.log(savedEvents[i])
    
   }
}

  

