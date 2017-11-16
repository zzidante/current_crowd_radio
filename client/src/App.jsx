import React, { Component } from "react";
import $ from "jquery";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import Playlist from "./Playlist.jsx";
import Footer from "./Footer.jsx";

import "./styles/css/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracklist: [],
      location: "",
      type: "",
      user: ""
    };
    this.getTracks();
    this.APIKEY = "b48755b6";
  }

  getTracks = () => {
    $.ajax({
      url: `https://api.jamendo.com/v3.0/artists/locations/?client_id=b48755b6&format=jsonpretty&limit=40&haslocation=true&location_country=JPN&location_city=Tokyo`
    }).done(artists => {
      console.log(artists);
      let artistArray = [];
      artists.results.forEach(artist => {
        artistArray.push(Number(artist.id));
      });
      $.ajax({
        url: `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${this
          .APIKEY}&format=jsonpretty&limit=40&id=${artistArray.join("+")}`
      }).done(artistTracks => {
        let trackArray = [];
        artistTracks.results.forEach(tracklist => {
          const track =
            tracklist.tracks[
              Math.floor(Math.random() * tracklist.tracks.length)
            ];
          trackArray.push({
            id: track.id,
            name: track.name,
            trackHREF: track.audio,
            artist: tracklist.name,
            album: track.album_name,
            image: track.image,
            duration: track.duration
          });
        });
        console.log(trackArray);
        this.setState({ tracklist: trackArray });
      });
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Player tracklist={this.state.tracklist} />
        <Playlist />
        <Footer />
      </div>
    );
  }
}

export default App;
