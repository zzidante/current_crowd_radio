import React, { Component } from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import api from "../api";


class LocationSearch extends Component {
  

  onChange = locationBar => {
    const loc = locationBar.replace(/^ +/, '');
    window.setState({ locationBar: loc })
  };

  setLocation = event => {
    event.preventDefault();
    const loc  = window.getState().locationBar
    if ( !loc.trim ){
      window.setState({searchWarning: "City cannot be blank."})
      return
    } else if (/\d+/.test(loc))  {
      window.setState({searchWarning: "City must not contain an address"})
      return
    } else if ( !/,/.test(loc)) {
      window.setState({searchWarning: "Must have city and country."})
      return
    }
    api.setLocation();
    api.getTracksByLocation();
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
      </form>
    )
  }
}

export default LocationSearch
