import React, { Component } from "react";
import $ from "jquery";
<<<<<<< HEAD
import Player from './Player/Player'
import './styles/css/index.css'
=======
import Nav from './Nav.jsx'
import Player from './Player/Player.jsx'
import Playlist from './Playlist.jsx'
import Footer from './Footer.jsx'

import './styles/css/index.css'


>>>>>>> 489e2f4dfee7ffaf90a6a03c8ad89df0e37ef355
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [],
      location: '',
      type: '',
      user: ''
    };
    this.getTracks();
    this.APIKEY = "b48755b6"
  }

  getTracks = () => {
    $.ajax({
      url:
        `https://api.jamendo.com/v3.0/artists/locations/?client_id=b48755b6&format=jsonpretty&limit=40&haslocation=true&location_country=CAN&location_city=vancouver`
    }).done(artists => {
      let artistArray = [];
      artists.results.forEach( artist => {
        artistArray.push(Number(artist.id))
      })
      $.ajax({
        url: `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${this.APIKEY}&format=jsonpretty&limit=40&id=${artistArray.join("+")}`
      }).done(artistTracks => {
        let hrefArray = [];
        artistTracks.results.forEach( trackList => {
          hrefArray.push(trackList.tracks[(Math.floor(Math.random()*trackList.tracks.length))])
        });
        console.log(hrefArray);
        this.setState({ trackList: hrefArray });
      });
    })
  };

  ref = player => {
    this.player = player;
  };
  
  render() {
    return (
      <div>
        <Nav />
        <Player />
        <Playlist />
        <Footer />
      </div>
    )
  }

}

export default App;
