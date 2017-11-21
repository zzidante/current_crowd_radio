import React, { Component } from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import api from "../api";
import Warning from "../Warning.jsx";
import validation from '../validation'

class LocationSearch extends Component {
  

  onChange = locationBar => {
    const loc = locationBar.replace(/^ +/, '');
    window.setState({ locationBar: loc })
  };

  setLocation = event => {
    event.preventDefault();
    const loc  = window.getState().locationBar

    if (validation.locationSearch(loc)) {
      api.setLocation();
      api.getTracksByLocation();
    }
  };
  

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
        {!window.getState().modal && window.getState().warning && <Warning warning={window.getState().warning} />}

      </form>
    )
  }
}

export default LocationSearch
