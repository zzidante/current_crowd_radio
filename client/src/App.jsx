import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Player from './Player/Player.jsx';
import Playlist from './Playlist.jsx';
import Footer from './Footer.jsx';
import './styles/css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.APIKEY = 'b48755b6';
  }
  render() {
    return (
      <div>
        <Nav location={window.getState().location} />
        <div className="back-img">
          <Player tracklist={window.getState().tracklist} />
          <Playlist type={window.getState().type} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
