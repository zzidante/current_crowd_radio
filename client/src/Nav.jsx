import React, { Component } from "react";
import Login from "./User/Login.jsx";
import Register from "./User/Register.jsx";
import Warning from "./Warning.jsx";
import { Modal } from "react-bootstrap";
import PlacesAutocomplete from "react-places-autocomplete";
import api from './api'
class Nav extends Component {
  guest = () => window.setState({ userId: "guest" });
  closeModal = () => window.setState({ modal: false });
  openModal = event => {
    event.preventDefault();
    window.setState({ modal: event.target.value });
  };
  logout = () => window.setState({ userId: "" });

  onChange = locationBar => window.setState({ locationBar });

  setLocation = event => {
    event.preventDefault();
    api.setLocation();
  }
            

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
    const { modal, warning, userId } = window.getState();
    return (
      <header>
        <h3>
          <img className="brand-icon" src="" />
        </h3>
        <h3>
          <a href="#">Current Crowd Radio</a>
        </h3>

        <form onSubmit={this.setLocation}>
          <PlacesAutocomplete
            id="location-search"
            inputProps={inputProps}
            styles={myStyles}
          />
          <button type="submit" className="btn btn-secondary main-btn">
            Submit
          </button>
        </form>

        {userId === "" && (
          <nav>
            <form id="login">
              <button
                className="btn btn-primary"
                name="type"
                value="login"
                onClick={this.openModal}
              >
                Login
              </button>
            </form>
            <form id="register">
              <button
                className="btn btn-primary"
                name="type"
                value="register"
                onClick={this.openModal}
              >
                Register
              </button>
            </form>
            <Modal show={!!modal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {modal === "login" && "Login"}
                  {modal === "register" && "Register"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modal === "login" && <Login />}
                {modal === "register" && <Register />}
              </Modal.Body>
              <Modal.Footer>
                {warning && <Warning warning={warning} />}
              </Modal.Footer>
            </Modal>
            <a className="btn btn-primary" onClick={this.guest}>
              Guest
            </a>
          </nav>
        )}
        {userId && (
          <nav>
            <li>
              <a onClick={this.logout}>Logout</a>
            </li>
          </nav>
        )}
      </header>
    );
  }
}

export default Nav;
