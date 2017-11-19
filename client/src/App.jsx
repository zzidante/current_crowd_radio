import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Player from './Player/Player.jsx';
import User from './User.jsx';
import Playlist from './Playlist.jsx';
import Footer from './Footer.jsx';
import './styles/css/index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav location={window.getState().location} />
        <div className="back-img">
          <div className="body-dashboard container">
            { window.getState().userId &&
              <div className="row-fluid">
                <Playlist type={window.getState().type} />
                <User />
                <Player tracklist={window.getState().tracklist} />
              </div>
            }
            { window.getState().userId === '' && 
              <div>
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
