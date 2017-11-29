import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api/jamendo";
import { setState, getState } from "../index";

class Name extends Component {
  setLocation = event => {
    setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {
    const { username, token } = getState();

    return (
      <section className="username-heading profile-block ">
        {token === "guest" &&
          <div className="center-a-el">
            <h2>Welcome Guest!</h2>
            <h4>
              Sign in to save your new discoveries!
            </h4>
          </div>
        }

        {token !== "guest" && (
          <div className="center-a-el">
            <h2>Welcome {username}!</h2>
            <Link type="button" className="btn btn-primary" to="/Profile">
              Edit Profile
            </Link>
          </div>
        )}
      </section>
    );
  }
}

export default Name;
