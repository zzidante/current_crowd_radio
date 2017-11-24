import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "./api/jamendo";
import { setState, getState } from "./index";
class User extends Component {
  setLocation = event => {
    setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {
    const { playlists, username } = getState();
    let locations = [];
    if (playlists) {
      locations = Object.keys(playlists).map(location => {
        return (
          <li key={location}>
            <button
              className="btn btn-link"
              onClick={this.setLocation}
              value={location}
            >
              {location}
            </button>
          </li>
        );
      });
    }
    return (
      <section className="username-heading col-md-3 col-xs-6">
        <h2>{username}</h2>

        {username !== "guest" && (
          <Link type="button" className="btn btn-sm" to="/Profile">
            Profile
          </Link>
        )}

        <ul>{locations}</ul>
      </section>
    );
  }
}

export default User;
