import axios from "axios";
require("promise.prototype.finally").shim();
import tough from "tough-cookie";
import { setState, getState } from "../index";
import jamendo from "./jamendo";

const cookieJar = new tough.CookieJar();

const serverError = {
  userMessage: {
    message: "We're sorry, something went wrong, please try again later.",
    style: "danger"
  }
};
const notAuthorized = {
  userMessage: { message: "You are not authorized to do that", style: "danger" }
};

const addToPlaylist = (songId, type, currentTarget) => {
  axios
    .post(`/playlists/${getState().locationBar}/users/${getState().token}`, {
      songId,
      type
    })
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
        console.log(currentTarget);
      }
    })
    .catch(() => {
      setState(serverError);
    });
};

const moveToPlaylist = (songId, type) => {
  const typeFrom = type === "archive" ? "current" : "archive";
  axios
    .put(`/playlists/${getState().locationBar}/users/${getState().token}`, {
      songId,
      typeFrom,
      typeTo: type
    })
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
        jamendo.getTracksById();
      }
    })
    .catch(() => {
      setState(serverError);
    });
};

const deleteFromPlaylist = (songId, type) => {
  axios
    .delete(`/playlists/${getState().locationBar}/users/${getState().token}`, {
      params: { songId, type }
    })
    .then(res => {
      if (res.data) {
        setState({ playlists: res.data });
        jamendo.getTracksById();
      }
    })
    .catch(() => {
      setState(serverError);
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
      const { token } = res.data;
      if (token) {
        localStorage.token = token;
        setState({
          token,
          password: "",
          confirmPassword: "",
          userMessage: {},
          modal: false
        });
      }
    })
    .catch(err => {
      if (!err.response) {
        setState(serverError);
        return;
      } else if (err.response.status === 401) {
        setState({
          userMessage: { message: "Email already exists.", style: "danger" }
        });
        return;
      }
    });
};

const loginUser = (email, password) => {
  axios
    .put("/users", {
      auth: {
        email,
        password,
        token: localStorage.token
      }
    })
    .then(res => {
      const { username, defaultLocation } = res.data.user;
      const { token } = res.data;
      if (token) {
        localStorage.token = token;
        setState({
          token,
          username,
          locationBar: defaultLocation,
          playlists: res.data.playlists,
          password: "",
          userMessage: {},
          modal: false
        });
        jamendo.getTracksByLocation();
      }
    })
    .catch(err => {
      if (!err.response) {
        setState(serverError);
        return;
      } else if (err.response.status === 401) {
        setState({
          userMessage: {
            message: "Incorrect email and password combination.",
            style: "danger"
          }
        });
        return;
      }
    });
};

const updateUser = (username, email, defaultLocation) => {
  axios
    .put(`/users/${getState().token}`, {
      data: { username, email, defaultLocation },
      jar: cookieJar
    })
    .then(() => {
      setState({
        userMessage: { message: "Profile updated.", style: "success" }
      });
    })
    .catch(err => {
      if (!err.response) {
        setState(serverError);
        return;
      } else if (err.response.status === 401) {
        setState(notAuthorized);
        return;
      }
    });
};

const updatePassword = (oldPassword, newPassword) => {
  axios
    .put(`/users/${getState().token}/password`, {
      data: { oldPassword, newPassword },
      jar: cookieJar
    })
    .then(() => {
      setState({
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
        userMessage: { message: "Password updated.", style: "success" }
      });
    })
    .catch(err => {
      if (!err.response) {
        setState(serverError);
        return;
      } else if (err.response.status === 401) {
        setState(notAuthorized);
        return;
      }
    });
};
const getUser = () => {
  return axios
    .get(`/users/${getState().token}`, {
      jar: cookieJar
    })
    .then(res => {
      const { username, email, defaultLocation } = res.data.user;
      setState({ username, email, defaultLocation });
      console.log(defaultLocation);
      jamendo.getTracksByLocation();
    })
    .catch(err => {
      if (!err.response) {
        setState(serverError);
        return;
      } else if (err.response.status === 401) {
        setState(notAuthorized);
        return;
      } else if (err.response.status === 404) {
        setState({
          userMessage: { message: "User not found.", style: "danger" }
        });
      }
    });
};

const logout = () => {
  axios.delete("/users/");
};
module.exports = {
  addToPlaylist,
  moveToPlaylist,
  deleteFromPlaylist,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
  logout
};
