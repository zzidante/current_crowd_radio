import React, { Component } from "react";
import PlacesAutocomplete from 'react-places-autocomplete'
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: ""
    };
  }

  onChange = city => {
    this.setState({ city });
  };

  handleFormSubmit = event => {
    event.preventDefault()
    this.props.setLocation(this.state.city);
    
  };

  render() {
    const myStyles = {
      input: { color: 'black', width: '20vw' },

    }
    const inputProps = {
      value: this.state.city,
      onChange: this.onChange,
      onSelect: this.onDropdownSelect,
      onEnterKeyDown: this.handleFormSubmit
    }
    return (
      <header>
        <h3>
          <img className="brand-icon" src="" />
        </h3>
        <h3>
          <a href="#">Current Crowd Radio</a>
        </h3>
       
        <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete id="location-search" inputProps={inputProps} styles={myStyles}/>
        <button type="submit" className="btn btn-secondary main-btn">Submit</button>
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
