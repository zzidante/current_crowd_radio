import React, { Component } from "react";
import axios from "axios";
import api from '../api';

class Login extends Component {
  handleEmailChange = event =>
    window.setState({ email: event.target.value });
  handlePasswordChange = event =>
    window.setState({ password: event.target.value });

  login = event => {
    event.preventDefault();
    const { email, password } = window.getState();
    if (!email || !password) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    axios
      .put("http://localhost:8080/users", {
        email: window.getState().email,
        password: window.getState().password
      })
      .then(res => {
        const {id, username, default_location} = res.data.user
        if (id) {
          window.setState({ userId: id, username, locationBar: default_location, playlists: res.data.playlists, password: "", warning: "" });
          api.getTracksByLocation();
        }
      });
  };
  render() {
    return (
      <div>
          <form onSubmit={this.login} className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="email"
              value={window.getState().email}
              onChange={this.handleEmailChange}
            />
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={window.getState().password}
              onChange={this.handlePasswordChange}
            /> 
            <button className="btn btn-primary" type="submit">
              Submit
            </button>         
        </form>
          </div>

    );
  }
}
export default Login;
