console.log('hello world')
var ticketMasterKey = `6Y9ApEUv7D1XBXY1QjDD3Y6TwozbNAik`
var ticketMasterEvents = `http://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${ticketMasterKey}`

fetch(ticketMasterEvents)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data);
})