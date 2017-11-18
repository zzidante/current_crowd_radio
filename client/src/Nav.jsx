import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import iso from 'iso-3166-1';
import axios from 'axios';
class Nav extends Component {

  onChange = locationBar => {
    window.setState({ locationBar });
  };

  setLocation = event => {
    event.preventDefault();
    const loc = window.getState().locationBar
    const city = loc.match(/^\w+[a-z]?/i)[0]
    const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0])
    if (isoCodes) {
      window.setState({county: isoCodes.alpha3, city})
      this.getTracks(isoCodes.alpha3, city)
    } else {
      console.log('none found')
    }
  };
  getTracks = (country, city) => {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/locations/?client_id=b48755b6&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
      )
      .then(response => {
        let artistArray = [];
        response.data.results.forEach(artist => {
          artistArray.push(Number(artist.id));
        });
        axios
          .get(
            `https://api.jamendo.com/v3.0/artists/tracks/?client_id=b48755b6&format=jsonpretty&limit=40&id=${artistArray.join('+')}`
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
            window.setState({ tracklist: trackArray });
          });
      });
  }

  render() {
    const myStyles = {
      input: { color: 'black', width: '20vw' },

    }
    const inputProps = {
      value: window.getState().locationBar,
      onChange: this.onChange,
      onSelect: this.onDropdownSelect
    }
    return (
      <header>
        <h3>
          <img className="brand-icon" src="" />
        </h3>
        <h3>
          <a href="#">Current Crowd Radio</a>
        </h3>
       
        <form onSubmit={this.setLocation}>
        <PlacesAutocomplete id="location-search" inputProps={inputProps} styles={myStyles}/>
        <button type="submit">Submit</button>
      </form>
        <nav>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Guest</a>
          </li>
          <li>Hello</li>
        </nav>
      </header>
    );
  }
}

export default Nav;
