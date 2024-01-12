// MusicBrainz.js
//const requestUrl = `https://musicbrainz.org/ws/2/release?query=artist:${artistName}&fmt=json`;
var searchArtist = document.querySelector(`#search-artist`);

function getMusic(artistName) {
  var musicBrainzURL =
    "https://musicbrainz.org/ws/2/release?query=artist:" +
    artistName +
    "&fmt=json";

  fetch(musicBrainzURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Music Brainz Data", data);

      document.querySelector("#the-artist").textContent = artistName;

      // Clear previous results
      document.querySelector("#artist-results").innerHTML = "";

      for (var i = 0; i < data.releases.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = data.releases[i].title;
        document.querySelector("#artist-results").append(liEl);
      }

      // Call function to get more information about the artist
      getMoreArtistInfo(artistName);
    });
}

function getMoreArtistInfo(artistName) {
  // Make an additional request to the MusicBrainz API to get detailed artist information
  var artistInfoURL =
    "https://musicbrainz.org/ws/2/artist?query=" + artistName + "&fmt=json";

  fetch(artistInfoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (artistData) {
      console.log("Artist Information", artistData);

      // Display specific artist information on the web page
      var artistDetails = document.createElement("div");
      artistDetails.innerHTML = `
                 <h3>Artist Information:</h3>
                 <p>Name: ${artistData.artists[0].name}</p>
                 <p>Aliases: ${artistData.artists[0].aliases
                   .map((alias) => alias.name)
                   .join(", ")}</p>
                 <p>Sort Name: ${artistData.artists[0].sort_name}</p>
                 <p>Disambiguation: ${artistData.artists[0].disambiguation}</p>
                 <p>Type: ${artistData.artists[0].type}</p>
                 <p>Gender: ${artistData.artists[0].gender}</p>
                 <p>Country: ${artistData.artists[0].country}</p>
                 <p>Lifespan: ${artistData.artists[0].life_span.begin} - ${
        artistData.artists[0].life_span.end
      }</p>
             `;
      document.body.appendChild(artistDetails);
    })
    .catch(function (error) {
      console.error("Error fetching artist information:", error);
    });
}

searchArtist.addEventListener(`click`, function () {
  var artistInput = document.querySelector("#artist-name");
  var artistName = artistInput.value.trim();

  // Clear previous artist details
  var existingArtistDetails = document.querySelector("#artist-details");
  if (existingArtistDetails) {
    existingArtistDetails.remove();
  }

  getMusic(artistName);
});
fetch(artistInfoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (artistData) {
    console.log("Artist Information", artistData);

    // Display specific artist information on the web page
    var artistDetails = document.createElement("div");
    artistDetails.innerHTML = `
         <h3>Artist Information:</h3>
         <p>Name: ${artistData.artists[0].name}</p>
         <p>Aliases: ${artistData.artists[0].aliases
           .map((alias) => alias.name)
           .join(", ")}</p>
         <p>Sort Name: ${artistData.artists[0].sort_name}</p>
         <p>Disambiguation: ${artistData.artists[0].disambiguation}</p>
         <p>Type: ${artistData.artists[0].type}</p>
         <p>Gender: ${artistData.artists[0].gender}</p>
         <p>Country: ${artistData.artists[0].country}</p>
         <p>Lifespan: ${artistData.artists[0].life_span.begin} - ${
      artistData.artists[0].life_span.end
    }</p>
     `;
    document.body.appendChild(artistDetails);
  })
  .catch(function (error) {
    console.error("Error fetching artist information:", error);
  });

searchArtist.addEventListener(`click`, function () {
  var artistInput = document.querySelector("#artist-name");
  var artistName = artistInput.value.trim();

  // Clear previous artist details
  var existingArtistDetails = document.querySelector("#artist-details");
  if (existingArtistDetails) {
    existingArtistDetails.remove();
  }

  getMusic(artistName);
});
