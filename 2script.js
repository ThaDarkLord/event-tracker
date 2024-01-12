const lastFMAPIKey = "0ec3c812f6305d986beecf2b3674d340";
const lastFMBaseURL = "https://ws.audioscrobbler.com/2.0/?";

var searchArtist = document.querySelector(`#search-artist`);
var previousArtistName = "";
var artistResults = document.querySelector("#artist-results");
var theArtist = document.querySelector("#the-artist");

function clearPreviousArtistDetails() {
  var existingArtistDetails = document.querySelector("#artist-details");
  if (existingArtistDetails) {
    existingArtistDetails.remove();
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling
  }
}

function getMusic(artistName) {
  if (artistName === previousArtistName) {
    return;
  }

  const lastFMAlbumsURL = `${lastFMBaseURL}method=artist.gettopalbums&artist=${artistName}&api_key=${lastFMAPIKey}&format=json`;

  fetchData(lastFMAlbumsURL).then(function (data) {
    console.log("Last.fm Albums Data", data);

    theArtist.textContent = artistName;

    // Clear previous results
    artistResults.innerHTML = "";

    // Clear previous artist details
    clearPreviousArtistDetails();

    for (var i = 0; i < data.topalbums.album.length; i++) {
      var liEl = document.createElement("li");
      liEl.textContent = data.topalbums.album[i].name;
      artistResults.append(liEl);
    }

    // Call function to get more information about the artist
    getMoreArtistInfo(artistName);
    // Update the previous artist name
    previousArtistName = artistName;
  });
}

function getMoreArtistInfo(artistName) {
  const lastFMArtistInfoURL = `${lastFMBaseURL}method=artist.getinfo&artist=${artistName}&api_key=${lastFMAPIKey}&format=json`;

  fetchData(lastFMArtistInfoURL)
    .then(function (artistData) {
      console.log("Last.fm Artist Information", artistData);

      if (artistData && artistData.artist) {
        // Display specific artist information on the web page
        var artistDetails = document.createElement("div");
        artistDetails.id = "artist-details";
        artistDetails.innerHTML = `
        <h3>Artist Information:</h3>
        <p>Name: ${artistData.artist.name || "N/A"}</p>
        <p>Listeners: ${
          artistData.artist.stats
            ? artistData.artist.stats.listeners || "N/A"
            : "N/A"
        }</p>
        <p>Playcount: ${
          artistData.artist.stats
            ? artistData.artist.stats.playcount || "N/A"
            : "N/A"
        }</p>
        <p>Biography: ${
          artistData.artist.bio ? artistData.artist.bio.summary || "N/A" : "N/A"
        }</p>
        <p>Most Popular Songs: ${getMostPopularSongs(artistData) || "N/A"}</p>
      `;
        document.body.appendChild(artistDetails);
      } else {
        console.error("Invalid artist data received:", artistData);
        handleArtistInfoError();
      }
    })
    .catch(function (error) {
      console.error("Error fetching artist information:", error);
      handleArtistInfoError();
    });
}

function getMostPopularSongs(artistData) {
  // based on the artistData received from Last.fm API.
  return artistData.toptracks
    ? artistData.toptracks.track.map((track) => track.name).join(", ")
    : "N/A";
}

function handleArtistInfoError() {
  // Handle the error or provide a user-friendly message
  var errorDetails = document.createElement("div");
  errorDetails.id = "artist-error";
  errorDetails.innerHTML =
    "<p>Error fetching artist information. Please try again later.</p>";
  document.body.appendChild(errorDetails);
}

searchArtist.addEventListener(`click`, function () {
  var artistInput = document.querySelector("#artist-name");
  var artistName = artistInput.value.trim();

  // Clear previous artist details
  clearPreviousArtistDetails();

  getMusic(artistName);
});
