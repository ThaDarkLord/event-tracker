function savedEventCards() {

    savedEvents = JSON.parse(localStorage.getItem(`savedEventsKey`))
    if (!savedEvents) {
        savedEvents = [];
    }
    else console.log(savedEvents); {

        for (let i = 0; i < savedEvents.length; i++) {
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


            var eventDelButton = document.createElement(`button`)
            eventDelButton.setAttribute(`class`, `button is-small is-primary`)
            eventDelButton.textContent = `Delete Event`



            eventNamePara.textContent =
                "Event Name: " + savedEvents[i].name;
            eventDtPara.textContent =
                "Date/Time: " + savedEvents[i].date;
            eventCityPara.textContent = "City: " + savedEvents[i].location
            eventVenuePara.textContent =
                "Venue: " + savedEvents[i].venue;



            eventNameArticle.appendChild(eventNameHeader)
            eventNameArticle.appendChild(eventNamePara)

            eventDtArticle.appendChild(eventDtHeader)
            eventDtArticle.appendChild(eventDtPara)

            eventCityArticle.appendChild(eventCityHeader)
            eventCityArticle.appendChild(eventCityPara)

            if (savedEvents[i].venue) {
                eventVenueArticle.appendChild(eventVenueHeader)
                eventVenueArticle.appendChild(eventVenuePara)
            } else {
                console.log(`No Venue`);
            }
            articleContainer.append(eventNameArticle, eventDtArticle, eventCityArticle, eventVenueArticle, eventDelButton)

            savedCards.append(articleContainer)


            eventDelButton.addEventListener(`click`, function (event) {
                if (event.target.matches(`button`)) {
                    console.log(savedCards.children[i]);

                    savedCards.children[i].remove()
                 
                }

            })



        }
    }

}

savedEventCards()

