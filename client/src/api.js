import axios from "axios";
import iso from "iso-3166-1";

// Converts text to city/county codes, sets state, and loads new tracklist.
const setLocation = () => {
  const loc = window.getState().locationBar;
  const city = loc.match(/^\w+[a-z]?/i)[0];
  const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0]);
  if (isoCodes) {
    window.setState({ county: isoCodes.alpha3, city });
    getTracks(isoCodes.alpha3, city);
  }
};

// given a country and city loads random list of songs
const getTracks = (country, city) => {
  const { apikey } = window.getState();
  axios
    .get(
      `https://api.jamendo.com/v3.0/artists/locations/?client_id=${apikey}&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
    )
    .then(response => {
      let artistArray = [];
      response.data.results.forEach(artist => {
        artistArray.push(artist.id);
      });
      axios
        .get(
          `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${apikey}&format=jsonpretty&limit=40&id=${artistArray.join(
            "+"
          )}`
        )
        .then(artistTracks => {
          let trackArray = [];
          artistTracks.data.results.forEach(tracklist => {
            const track =
              tracklist.tracks[
                Math.floor(Math.random() * tracklist.tracks.length)
              ];
            trackArray.push({
              id: track.id,
              name: track.name,
              trackHREF: track.audio,
              artist: tracklist.name,
              album: track.album_name,
              image: track.image,
              duration: track.duration
            });
          });
          window.setState({ tracklist: trackArray });
        });
    });
};
module.exports = {
  setLocation,
  getTracks
};
