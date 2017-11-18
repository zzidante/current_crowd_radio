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
          { window.getState().userId &&
            <div>
              <Playlist type={window.getState().type} />
              <Player tracklist={window.getState().tracklist} />
              <User />
            </div>
          }
          { window.getState().userId === '' && 
            <div>
            </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
