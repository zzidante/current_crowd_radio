import React, { Component } from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import api from "../api";


class LocationSearch extends Component {
  
  setLocation = event => {
    event.preventDefault();
    api.setLocation();
    api.getTracksByLocation();
  };

  onChange = locationBar => window.setState({ locationBar });
  

  render() {
    const myStyles = {
      input: {
        color: "black",
        width: "20vw",
        fontFamily: "'Open Sans', 'sans-serif'"
      }
    };

    const inputProps = {
      value: window.getState().locationBar,
      onChange: this.onChange,
      onSelect: this.onDropdownSelect
    };

    return (
      <form className="location-search-form" onSubmit={this.setLocation}>
        <PlacesAutocomplete
          id="location-search"
          inputProps={inputProps}
          styles={myStyles}
          className="col-sm-push-6"
        />
        <button type="submit" className="btn btn-primary main-btn col-sm-pull-6">
          Submit
        </button>
      </form>
    )
  }
}

export default LocationSearch
