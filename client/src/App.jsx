import React, { Component } from "react";
import Splash from "./Splash.jsx";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import User from "./User.jsx";
import Playlist from "./Playlist.jsx";
import Footer from "./Footer.jsx";
import { getState } from './index';
import api from './api/internal'
import "./styles/css/index.css";

class App extends Component {
  componentDidMount() {
    if (localStorage.token){
      api.loginUser()
    }
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="back-img">
          <div className="body-dashboard container">

              <div className="row-fluid">
                {!getState().token && (
                  <Splash />
                )}
                
                {getState().token && (
                  <div>
                    <User />
                    <Playlist type={getState().type} />
                    <Player tracklist={getState().tracklist} />
                  </div>
                )}
              </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
