import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import User from "./User.jsx";
import Playlist from "./Playlist.jsx";
import Footer from "./Footer.jsx";
import { getState } from './index';
import "./styles/css/index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Nav location={getState().location} />
        <div className="back-img">
          <div className="body-dashboard container">
            {getState().userId && (
              <div className="row-fluid">
                <User />
                <Playlist type={getState().type} />
                <Player tracklist={getState().tracklist} />
              </div>
            )}
            {getState().userId === "" && <div />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
