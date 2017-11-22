import React, { Component } from "react";
import { Route } from 'react-router-dom';
import api from "./api";

class User extends Component {
  setLocation = event => {
    window.setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  //   goToProfile = withRouter(({history}) => {
  //     console.log(history)
  //     console.log("Profile button clicked")
  //     const { email, userId, username } = window.getState();
  //     console.log(userId, email, username);      
  //     history.push('/User')
  //     // api.editUser( email, password );
  // });

   Button = () => (
    <Route render={({ history }) => (
      <button                   
        type='button'
        className ="btn btn-sm"
        onClick={() => { history.push('/User') }}
      >
        Click Me!
      </button>
    )} />
  )


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
        <Route>
          {userId !== "guest" && this.Button }
        </Route>
        <ul>{locations}</ul>
      </section>
    );
  }
}

export default User;
