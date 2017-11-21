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
  const { country, city } = window.getState();
  axios
    .get(
      `https://api.jamendo.com/v3.0/artists/locations/?client_id=${process.env
        .REACT_APP_JAMENDO_API}&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
    )
    .then(response => {
      if (response.data.results[0].locations[0].country !== country) {
          window.setState({
            searchWarning:
              "We're sorry, we could not find any artists for that city."
          });
          console.log("No results");
        } else {
        let artistArray = [];
        response.data.results.forEach(artist => {
          artistArray.push(artist.id);
        });
        axios
          .get(
            `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${process
              .env
              .REACT_APP_JAMENDO_API}&format=jsonpretty&limit=40&id=${artistArray.join(
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
            window.setState({ tracklist: trackArray, searchWarning: '' });
          });
      }
    });
};

const getTracksById = () => {
  const { playlists, playlistType, locationBar } = window.getState();
  const trackArray = playlists[locationBar][playlistType];
  if (trackArray) {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${process.env
          .REACT_APP_JAMENDO_API}&format=jsonpretty&limit=40&track_id=${trackArray.join(
          "+"
        )}`
      )
      .then(res => {
        const trackArray = [];
        res.data.results.forEach(track => {
          const info = track.tracks[0];
          trackArray.push({
            id: info.id,
            name: info.name,
            trackHREF: info.audio,
            artist: track.name,
            album: info.album_name,
            image: info.image,
            duration: info.duration
          });
        });
        window.setState({ tracklist: trackArray });
      });
  } else {
    window.setState({ tracklist: [] });
  }
};

const addToPlaylist = (songId, type) => {
  axios
    .post(
      `http://localhost:8080/playlists/${window.getState()
        .locationBar}/users/${window.getState().userId}`,
      { songId, type }
    )
    .then(res => {
      if (res.data) {
        window.setState({ playlists: res.data });
      }
    });
};
const moveToPlaylist = (songId, type) => {
  const typeFrom = type === "archive" ? "current" : "archive";
  axios
    .put(
      `http://localhost:8080/playlists/${window.getState()
        .locationBar}/users/${window.getState().userId}`,
      { songId, typeFrom, typeTo: type }
    )
    .then(res => {
      if (res.data) {
        window.setState({ playlists: res.data });
        getTracksById();
      }
    });
};
const deleteFromPlaylist = (songId, type) => {
  axios
    .delete(
      `http://localhost:8080/playlists/${window.getState()
        .locationBar}/users/${window.getState().userId}`,
      { params: { songId, type } }
    )
    .then(res => {
      if (res.data) {
        window.setState({ playlists: res.data });
        getTracksById();
      }
    })
    .catch( () => {
      window.setState({searchWarning: "We're sorry, something went wrong, please try again later."});
    })
};

const registerUser = (username, email, password, loc) => {
  axios
    .post("http://localhost:8080/users", {
      username,
      email,
      password,
      defaultLocation: loc
    })
    .then(res => {
      window.setState({ warning: "" });
      const { userId } = res.data;
      if (userId) {
        window.setState({
          userId,
          password: "",
          confirmPassword: "",
          warning: "",
          modal: false
        });
      }
    })
    .catch(() => {
      window.setState({ warning: "Email already exists." });
    });
};

const loginUser = (email, password) => {
  axios
    .put("http://localhost:8080/users", {
      email,
      password
    })
    .then(res => {
      console.log(res);
      const { id, username, default_location } = res.data.user;
      if (id) {
        window.setState({
          userId: id,
          username,
          locationBar: default_location,
          playlists: res.data.playlists,
          password: "",
          warning: "",
          modal: false
        });
        getTracksByLocation();
      }
    })
    .catch(() => {
      window.setState({ warning: "Incorrect email and password combination." });
    });
};
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById,
  addToPlaylist,
  moveToPlaylist,
  deleteFromPlaylist,
  registerUser,
  loginUser
};
