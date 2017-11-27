import React, { Component } from "react";
import api from "./api/internal";
import { setState, getState } from "./index";
class Locations extends Component {

    setLocation = event => {
      setState({ locationBar: event.target.value });
      api.setLocation();
      api.getTracksByLocation();
    };

    render() {
      const { playlists, } = getState();
      let locations = [];

      if (playlists) {
        locations = Object.keys(playlists).map(location => {

          // get only city and country, ignore all other descriptors
          location = location.split(',')[0] + ", " + (location.split(',')[2] ? location.split(',')[2] : location.split(',')[1])

          return (
            <li key={location}>
              <button
                className="btn"
                onClick={this.setLocation}
                value={location}
              >
              {location}
              </button>
            </li>
          );
        });
      }
    return (
       <p>{locations}</p>
    );
  }
}
export default Locations;
