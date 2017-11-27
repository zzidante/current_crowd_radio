import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "./api/jamendo";
import { setState, getState } from "./index";
import Locations from './Locations.jsx'
class User extends Component {
  setLocation = event => {
    setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {
    const { username } = getState();

    return (
      <section className="username-heading col-md-3 col-xs-6">
        <h2>{username}</h2>

        {username !== "guest" && (
          <Link type="button" className="btn btn-primary" to="/Profile">
            Profile
          </Link>
        )}

        <ul>
        <li>Your Cities</li>
        <Locations /></ul>
        <div className="clear"/>
      </section>
    );
  }
}

export default User;
