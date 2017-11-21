import React, { Component } from 'react';
import { DropdownButton, MenuItem } from "react-bootstrap";

class Guest extends Component {

  openModal = event => {
    event.preventDefault();
    window.setState({ modal: event.currentTarget.value });
  };

  guest = () => window.setState({ userId: "guest" });
  
  render() {
    return (
      <nav>
        <form id="login">
          <button
            className="btn btn-primary lg-size-btn"
            name="type"
            value="login"
            onClick={this.openModal}
          >
            Login
          </button>
        </form>

        <form id="register">
          <button
            className="btn btn-primary lg-size-btn"
            name="type"
            value="register"
            onClick={this.openModal}
          >
            Register
          </button>
          
          <button className="btn btn-primary lg-size-btn" onClick={this.guest}>
            Guest
          </button>
        </form>

        <DropdownButton pullRight title={<i><span className="fa fa-bars"></span></i>}>
          <MenuItem>
            <button
              className="btn"
              name="type"
              value="login"
              onClick={this.openModal}
            >
              Login
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="btn"
              name="type"
              value="register"
              onClick={this.openModal}
            >
              Register
            </button>
          </MenuItem>
          <MenuItem>
            <button className="btn" onClick={this.guest}>
              Guest
            </button>
          </MenuItem>
        </DropdownButton>
      </nav>
    )
  }
}

export default Guest