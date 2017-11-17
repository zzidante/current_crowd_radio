import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav.jsx";
import Player from "./Player/Player.jsx";
import Playlist from "./Playlist.jsx";
import Footer from "./Footer.jsx";

import iso from "iso-3166-1";
import "./styles/css/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracklist: [],
      location: {
        country: "",
        city: ""
      },
      type: "",
      user: ""
    };
    this.APIKEY = "b48755b6";
  }

  setLocation = loc => {
    const city = loc.match(/^\w+[a-z]?/i)[0]
    const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0])
    if (isoCodes) {
    // console.log(loc.match(/(\w+\s)?\w+.?$/)[0])
      this.setState({county: isoCodes.alpha3, city})
      this.getTracks(isoCodes.alpha3, city)
    } else {
      console.log("none found")
    }
  };

  getTracks = (country, city) => {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/locations/?client_id=b48755b6&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
      )
      .then(response => {
        console.log(response);
        let artistArray = [];
        response.data.results.forEach(artist => {
          artistArray.push(Number(artist.id));
        });
        axios
          .get(
            `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${this
              .APIKEY}&format=jsonpretty&limit=40&id=${artistArray.join("+")}`
          )
          .then(artistTracks => {
            let trackArray = [];
            artistTracks.data.results.forEach(tracklist => {
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
            this.setState({ tracklist: trackArray });
          });
      });
  };

  render() {
    return (
      <div>
        <Nav location={this.state.location} setLocation={this.setLocation} />
        <Player tracklist={this.state.tracklist} />
        <Playlist type={this.state.type} />
        <Footer />
      </div>
    );
  }
}

export default App;
