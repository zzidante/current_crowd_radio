import axios from "axios";
import iso from "iso-3166-1";

// Converts text to city/county codes, sets state, and loads new tracklist.
const setLocation = () => {
  const loc = window.getState().locationBar;
  const city = loc.match(/^\w+[a-z]?/i)[0];
  const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0]);
  if (isoCodes) {
    window.setState({ country: isoCodes.alpha3, city });
  }
};

// given a country and city loads random list of songs
const getTracksByLocation = () => {
  const { apikey, country, city } = window.getState();
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

const getTracksById = () => {
  const { playlists, playlistType, locationBar, apikey } = window.getState()
  const trackArray = playlists[locationBar][playlistType]
  axios
  .get(
    `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${apikey}&format=jsonpretty&limit=40&track_id=${trackArray.join(
      "+"
    )}`
  )
}

const addToPlaylist = (songId, type) => {
  console.log("client", songId);
  axios.post(`http://localhost:8080/playlists/${window.getState().locationBar}/users/${window.getState().userId}`, {songId, type})
}
const moveToPlaylist = (songId, type) => {
  const typeFrom = type === "archive" ? "current" : "archive";
  axios.put(`http://localhost:8080/playlists/${window.getState().locationBar}/users/${window.getState().userId}`, {songId, typeFrom, typeTo: type})
}
const deleteFromPlaylist = (songId, type) => {
  axios.delete(`http://localhost:8080/playlists/${window.getState().locationBar}/users/${window.getState().userId}`, {songId, type})
}
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById,
  addToPlaylist,
  moveToPlaylist,
  deleteFromPlaylist
};
