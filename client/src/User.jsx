import React, { Component } from "react";
import api from "./api";

class User extends Component {
  setLocation = event => {
    event.preventDefault();
    window.setState({ locationBar: event.target.value });
    api.setLocation();
  };

  render() {
    const locations = window.getState().locations.map(location => {
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
    return (
      <section className="username-heading col-md-3 col-xs-6">
        <h2>Username</h2>
        <button className ="btn btn-sm">Edit Profile</button>
        <ul>{locations}</ul>
      </section>
    );
  }
}

export default User;
