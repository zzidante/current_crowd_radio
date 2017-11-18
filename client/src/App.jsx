import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Player from './Player/Player.jsx';
import Playlist from './Playlist.jsx';
import Footer from './Footer.jsx';
import './styles/css/index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav location={window.getState().location} />
        <Player tracklist={window.getState().tracklist} />
        <Playlist type={window.getState().type} />
        <Footer />
      </div>
    );
  }
}

export default App;
