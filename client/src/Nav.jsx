import React, { Component } from "react";
import LocationAutocomplete from "location-autocomplete";
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: ''
    };
  }

  onChange = event => {
    console.log(event.params);
    this.setState({ city: event.target.value });
  };

  onDropdownSelect = event => {
    console.log(event);
  }

  handleFormSubmit = event => {
    console.log(this.state.city);
    event.preventDefault();
    this.props.setLocation(this.state.city);
  };

  render() {
    return (
      <header>
        <h3>
          <img className="brand-icon" src="" />
        </h3>
        <h3>
          <a href="#">Current Crowd Radio</a>
        </h3>
        <form onSubmit={this.handleFormSubmit}>
          <LocationAutocomplete
            name="city"
            placeholder="City"
            targetArea="city, country"
            locationType="(regions)"
            googleAPIKey="AIzaSyAH90l4iuMnPfAOPdjJ1Xh2A8swpJ1rQHM"
            onChange={this.onChange}
            value={this.state.city}
            onDropdownSelect={this.onDropdownSelect}
          />
          <button type="submit">Change City</button>
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
