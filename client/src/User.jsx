import React, { Component } from "react";
import api from "./api";

class User extends Component {
  setLocation = event => {
    window.setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {
    const { playlists, userId, username } = window.getState()
    let locations = []
    if (playlists){
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
        {userId !== "guest" && <button className ="btn btn-sm">Edit Profile</button> }
        <ul>{locations}</ul>
      </section>
    );
  }
}

export default User;
