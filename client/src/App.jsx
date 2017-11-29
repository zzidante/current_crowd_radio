import React, { Component } from "react";
import Splash from "./Splash.jsx";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import LocationList from "./LocationList.jsx";
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

    const dashboardBackground = {
      top: '0',
      left: '0',
      marginTop: '0',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      // backgroundImage: 'url("https://www.hdwallpaperswizard.com/wp-content/uploads/2017/03/Black-Music-Wallpaper-HD-1366x768.jpg")',
      // TODO: adds extra scrollbar with vertical-heavy aspect-ratio but removes lack of element problem. 
      backgroundColor: 'black',
      overflow: 'auto',
      width: '100%',
      zIndex: '-2',
    }

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

        {token && (
          <div style={dashboardBackground}>
            <div className="body-dashboard container">
              <div className="row-fluid">
                <LocationList />
                <Playlist type={type} />
                <Player tracklist={tracklist} />
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;