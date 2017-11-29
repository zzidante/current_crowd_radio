import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import api from "../api/jamendo";
import validation from "../validation";
import { setState, getState } from "../index";

class LocationSearch extends Component {
  onChange = locationBar => {
    const loc = locationBar.replace(/^ +/, "");
    setState({ locationBar: loc });
  };

  setLocation = event => {
    event.preventDefault();
    const loc = getState().locationBar;

    if (validation.locationSearch(loc)) {
      api.setLocation();
      api.getTracksByLocation();
    }
  };

  render() {
    const { locationBar } = getState();
    const myStyles = {
      input: {
        color: "black",
        width: "20vw",
        fontFamily: "'Open Sans', 'sans-serif'"
      }
    };

    const inputProps = {
      value: locationBar,
      onChange: this.onChange,
      onSelect: this.onDropdownSelect,
      options: { types: ['(cities)']}
    };

    return (
      <form className="location-search-form" onSubmit={this.setLocation}>
        <PlacesAutocomplete
          id="location-search"
          inputProps={inputProps}
          styles={myStyles}
          className="col-sm-push-6"
        />
        <button
          type="submit"
          className="btn btn-primary main-btn col-sm-pull-6"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default LocationSearch;
