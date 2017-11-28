import React, { Component } from "react";
import api from "./api/jamendo";
import { setState, getState } from "./index";
class Locations extends Component {

    setLocation = event => {
      setState({ locationBar: event.target.value, playing: false });
      api.setLocation();
      api.getTracksByLocation();
    };

    render() {
      const { playlists } = getState();
      let locations = [];

      if (playlists) {
        locations = Object.keys(playlists).map(location => {

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
       <ul>{locations}</ul>
    );
  }
}
export default Locations;
