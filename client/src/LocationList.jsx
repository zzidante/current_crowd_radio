import React, { Component } from "react";
import api from "./api/jamendo";
import { setState } from "./index";
import Locations from './Locations.jsx'
class LocationList extends Component {
  setLocation = event => {
    setState({ locationBar: event.target.value });
    api.setLocation();
    api.getTracksByLocation();
  };

  render() {

    return (
      <section className="username-heading col-md-3 col-xs-6">
        <Locations />
        <div className="clear" />
      </section>
    );
  }
}

export default LocationList;
