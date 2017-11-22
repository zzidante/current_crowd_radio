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

const API_KEY = process.env.REACT_APP_JAMENDO_API;

// given a country and city loads random list of songs
const getTracksByLocation = () => {
  const { country, city } = window.getState();
  axios
    .get(
      `https://api.jamendo.com/v3.0/artists/locations/?client_id=${API_KEY}&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
    )
    .then(response => {
      if (response.data.results[0].locations[0].country !== country) {
        window.setState({
          warning:
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
            `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=40&id=${artistArray.join(
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
            window.setState({ tracklist: trackArray, warning: '' });
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
        `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=40&track_id=${trackArray.join(
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
      })
      .catch(() => {
        window.setState({
          warning:
            "We're sorry, something went wrong, please try again later."
        });
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
    })
    .catch(() => {
      window.setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
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
    })
    .catch(() => {
      window.setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
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
    .catch(() => {
      window.setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
    });
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
    .catch((err) => {
      if (!err.response) {
        window.setState({ warning: "Server error: Please try again later."})
        return 
      } else if (err.response.status === 401) {
        window.setState({ warning: "Email already exists." });
        return
      }
    });
};

const loginUser = (email, password) => {
  axios
    .put("http://localhost:8080/users", {
      auth: { 
        email,
        password
      }
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
    .catch((err) => {
      if (!err.response) {
        window.setState({ warning: "Server error: Please try again later."})
        return 
      } else if (err.response.status === 401) {
        window.setState({ warning: "Incorrect email and password combination." });
        return
      }
    });
};

<<<<<<< HEAD
const updateUser = ( username, email, defaultLocation) => {
  axios.put(`http://localhost:8080/users/${window.getState().userId}`, {username, email, defaultLocation})
  .then( res => {
    window.setState({
      email: '',
      warning: ''
    })
  })
  .catch( err => {
    if (!err.response){
      window.setState({warning: "Server error: Please try again later."})
      return
    } else if (err.response.status === 401) {
      window.setState({ warning: "You are not authorized to do that." });
      return
    }
  })
}

const updatePassword = ( oldPassword, newPassword ) => {
  axios.put(`http://localhost:8080/users/${window.getState().userId}/password`, {oldPassword, newPassword})
  .then( res => {
    window.setState({
      password: '',
      confirmPassword: '',
    })
  })
  .catch( err => {
    if (!err.response){
      window.setState({warning: "Server error: Please try again later."})
      return
    } else if (err.response.status === 401) {
      window.setState({ warning: "You are not authorized to do that." });
      return
    }
  })
}
=======
  const getUser = () => {
    return axios.get(`http://localhost:8080/users/${window.getState().userId}`)
    .then(res => { 
      const {username, email, default_location} = res.data.user;
      window.setState({ username, email, defaultLocation: default_location })
      return true
    })
    .catch((err) => {
      if (!err.response) {
        window.setState({ warning: "Server error: Please try again later."})
        return 
      } else if (err.response.status === 401) {
        window.setState({ warning: "You are not authorized." });
        return
      } else if (err.response.status === 404) {
        window.setState({ warning: "User not found."})
      }
    });
  }

>>>>>>> 20e9b61f7bd6ae4a0a3e14d4f1d40a5404074a3d
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById,
  addToPlaylist,
  moveToPlaylist,
  deleteFromPlaylist,
  registerUser,
  loginUser,
  getUser
};
