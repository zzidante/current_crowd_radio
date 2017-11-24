import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { getState, setState } from "../index";

class Guest extends Component {
  openModal = event => {
    event.preventDefault();
    setState({ modal: event.currentTarget.value });
  };

  guest = (event) => {
    event.preventDefault();
    setState({ username: "Guest", token: "guest" });
  }

  render() {
    const { token } = getState();

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

          {!token && <button className="btn btn-primary lg-size-btn" onClick={this.guest}>
            Guest
          </button>}
        </form>

        <DropdownButton
          id="dropdown"
          pullRight
          title={
            <i>
              <span className="fa fa-bars" />
            </i>
          }
        >
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
          {!token &&
          <MenuItem>
            <button className="btn" onClick={this.guest}>
              Guest
            </button>
          </MenuItem>}
        </DropdownButton>
      </nav>
    );
  }
}

export default Guest;
