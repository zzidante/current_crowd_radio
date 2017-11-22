import React, { Component } from "react";
import { Route } from 'react-router-dom';
import api from "./api";

class User extends Component {
  setLocation = event => {
    window.setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

   getUser = (history) => {
     console.log("in get User")
    if (api.getUser()) {
      console.log('ture')
      history.push('/User')
    }
  }

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

          {userId !== "guest" && <Route render={({ history }) => (
      <button                   
        type='button'
        className ="btn btn-sm"
        onClick={ this.getUser(history)}
      >
        Click Me!
      </button>
    )} /> }

        <ul>{locations}</ul>
      </section>
    );
  }
}

export default User;
