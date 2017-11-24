import React, { Component } from "react";
import Splash from "./Splash.jsx";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import User from "./User.jsx";
import Playlist from "./Playlist.jsx";
import Footer from "./Footer.jsx";
import { getState } from "./index";
import api from "./api/internal";
import "./styles/css/index.css";
    


class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      api.loginUser();
    }
  }

  render() {
    const { token, loading, type, tracklist } = getState();
    return (
      <div id="main-content-spread">
        <Nav />
        {!getState().token && (
          <div className="body-dashboard container">
            <Splash />
          </div>
        )}
        {loading && (
          <div className="loader-underlay">
            <div className="loader" />
          </div>
        )}
        <div className="back-img">
          <div className="body-dashboard container">
            {token && (
              <div className="row-fluid">
                <User />
                <Playlist type={type} />
                <Player tracklist={tracklist} />
              </div>
            )}
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;