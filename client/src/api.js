

const addToPlaylist = (songId, type) => {
  axios
    .post(
      `/playlists/${getState()
        .locationBar}/users/${getState().userId}`,
      { songId, type }
    )
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
      }
    })
    .catch(() => {
      setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
    });
};

const moveToPlaylist = (songId, type) => {
  const typeFrom = type === "archive" ? "current" : "archive";
  axios
    .put(
      `/playlists/${getState()
        .locationBar}/users/${getState().userId}`,
      { songId, typeFrom, typeTo: type }
    )
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
        getTracksById();
      }
    })
    .catch(() => {
      setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
    });
};

const deleteFromPlaylist = (songId, type) => {
  axios
    .delete(
      `/playlists/${getState()
        .locationBar}/users/${getState().userId}`,
      { params: { songId, type } }
    )
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
        getTracksById();
      }
    })
    .catch(() => {
      setState({
        warning:
          "We're sorry, something went wrong, please try again later."
      });
    });
};

const registerUser = (username, email, password, loc) => {
  axios
    .post(`/users`, {
      username,
      email,
      password,
      defaultLocation: loc
    })
    .then(res => {
      setState({ warning: "" });
      const { userId } = res.data;
      if (userId) {
        setState({
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
        setState({ warning: "Server error: Please try again later."})
        return 
      } else if (err.response.status === 401) {
        setState({ warning: "Email already exists." });
        return
      }
    });
};

const loginUser = (email, password) => {
  axios
    .put("/users", {
      auth: { 
        email,
        password
      }
    })
    .then(res => {
      const { id, username, default_location } = res.data.user;
      if (id) {
        setState({
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
        setState({ warning: "Server error: Please try again later."})
        return 
      } else if (err.response.status === 401) {
        setState({ warning: "Incorrect email and password combination." });
        return
      }
    });
};

const updateUser = ( username, email, defaultLocation) => {
  axios.put(`/users/${getState().userId}`, {
    data: {username, email, defaultLocation}, 
    jar: cookieJar
  })
  .then( res => {
    setState({
      warning: ''
    })
  })
  .catch( err => {
    if (!err.response){
      setState({warning: "Server error: Please try again later."})
      return
    } else if (err.response.status === 401) {
      setState({ warning: "You are not authorized to do that." });
      return
    }
  })
}

const updatePassword = ( oldPassword, newPassword ) => {
  axios.put(`/users/${getState().userId}/password`, {
    data: {oldPassword, newPassword},
    jar: cookieJar
  })
  .then( res => {
    setState({
      password: '',
      confirmPassword: '',
    })
  })
  .catch( err => {
    if (!err.response){
      setState({warning: "Server error: Please try again later."})
      return
    } else if (err.response.status === 401) {
      setState({ warning: "You are not authorized to do that." });
      return
    }
  })
}
const getUser = () => {
  return axios.get(`/users/${getState().userId}`,  {
    jar: cookieJar
  })
  .then(res => { 
    const {username, email, defaultLocation} = res.data.user;
    setState({ username, email, defaultLocation }) // I work now
  })
  .catch((err) => {
    if (!err.response) {
      setState({ warning: "Server error: Please try again later."})
      return 
    } else if (err.response.status === 401) {
      setState({ warning: "You are not authorized." });
      return
    } else if (err.response.status === 404) {
      setState({ warning: "User not found."})
    }
  });
}
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById,
  addToPlaylist,
  moveToPlaylist,
  deleteFromPlaylist,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword
};
