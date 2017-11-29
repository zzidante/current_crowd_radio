import React, { Component } from "react";
import api from "./api/jamendo";
import { setState, getState } from "./index";
import Locations from './Locations.jsx'
import InfoSpiel from './InfoSpiel.jsx'

class LocationList extends Component {
  setLocation = event => {
    setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {
    const { token } = getState();    

    return (
      <section className="username-heading col-md-3 col-xs-6">
        {token !== "guest" &&
          <Locations />
        }
        {token === "guest" && 
          <InfoSpiel />
        }
        <div className="clear" />
      </section>
    );
  }
}

export default LocationList;
