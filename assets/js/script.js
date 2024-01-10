console.log('hello world')
var ticketMasterKey = `6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik`
var artistEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&keyword=J.%20Cole=*&sort=date,asc&classificationName=music`
// TODO: If time permits add city search functionality
// var cityEvents = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketMasterKey}&locale=*&sort=date,asc&city=Dallas&stateCode=TX&classificationName=music`

fetch(artistEvents)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data);
})

// TODO: If time permits add city search functionality
// fetch(cityEvents)
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log(data);
// })