import React, { Component } from "react";
import Login from "./User/Login.jsx";
import Register from "./User/Register.jsx";
import Warning from "./Warning.jsx";
import { Modal } from "react-bootstrap";
import PlacesAutocomplete from "react-places-autocomplete";
import api from "./api";
class Nav extends Component {
  guest = () => window.setState({ userId: "guest" });

  closeModal = () => window.setState({ modal: false });

  openModal = event => {
    event.preventDefault();
    window.setState({ modal: event.currentTarget.value });
  };

  logout = () => window.setState({ userId: "" });

  onChange = locationBar => window.setState({ locationBar });

  setLocation = event => {
    event.preventDefault();
    api.setLocation();
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
    const { modal, warning, userId } = window.getState();
    return (
      <header className="navbar-wrapper">
        <nav className="navbar navbar-nav navbar-expand-lg">

          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle hamburger-menu" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>  
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Current Crowd Radio</a>
            </div>

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
            <nav className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li id="login">
                  <button
                    className="btn btn-primary navbar-btn"
                    name="type"
                    value="login"
                    onClick={this.openModal}
                  >
                    Login
                  </button>
                </li>

                <li id="register">
                  <button
                    className="btn btn-primary navbar-btn"
                    name="type"
                    value="register"
                    onClick={this.openModal}
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button className="btn btn-primary navbar-btn" onClick={this.guest}>
                    Guest
                  </button>
                </li>
              </ul>
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
            </nav>
          )}
          {userId && (
            <li>
              <button className="btn btn-primary" onClick={this.logout}>Logout</button>
            </li>
          )}
          </div>
        </nav>
      </header>
    );
  }
}

export default Nav;
