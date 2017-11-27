import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import api from "../api/internal";
import validation from "../validation";
import { setState, getState } from "../index";
import PlacesAutocomplete from "react-places-autocomplete";
import UserMessage from "../UserMessage.jsx";
import Nav from "../Nav.jsx";
import Footer from "../Footer.jsx";
import "../styles/css/index.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    api.getUser();
  }

  handleUsernameChange = event => setState({ username: event.target.value });

  handleNewPasswordChange = event =>
    setState({ newPassword: event.target.value });

  handleOldPasswordChange = event =>
    setState({ oldPassword: event.target.value });

  handleConfirmPasswordChange = event =>
    setState({ confirmPassword: event.target.value });

  handleEmailChange = event => setState({ email: event.target.value });

  onChange = defaultLocation => setState({ defaultLocation });

  updateUser = event => {
    event.preventDefault();
    const { username, email, defaultLocation } = getState();
    if (validation.updateUser(username, email, defaultLocation)) {
      api.updateUser(username, email, defaultLocation);
    }
  };

  updatePassword = event => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = getState();
    if (validation.updatePassword(newPassword, confirmPassword)) {
      api.updatePassword(oldPassword, newPassword);
    }
  };

  render() {
    const myStyles = {
      input: {
        display: "block",
        width: "100%",
        height: "34px",
        fontSize: "14px",
        lineHeight: "1.42857143",
        color: "#555",
        backgroundColor: "#fff",
        backgroundImage: "none",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }
    };
    const inputProps = {
      value: getState().defaultLocation,
      onChange: this.onChange,
      placeholder: "City",
      id: "register-location"
    };

    const { email, username, newPassword, oldPassword, confirmPassword, userMessage, token } = getState();
    return (
      <div id="main-content-spread">
        <Nav />
        <section className="row">
          {userMessage && <UserMessage userMessage={userMessage} />}
          <section className="form-row">
            <section className="account-form">
              <form id="edit-account-form" onSubmit={this.updateUser}>
                <h3>Edit Your Account</h3>
                <div className="col-auto">
                  <label className="username" />
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleUsernameChange}
                    value={username}
                  />
                </div>

                <div className="col-auto">
                  <label className="email" />
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleEmailChange}
                    value={email}
                  />
                </div>

                <div className="col-auto">
                  <label className="default-location" />
                  <PlacesAutocomplete
                    inputProps={inputProps}
                    onChange={this.onChange}
                    styles={myStyles}
                  />
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </section>
          
            <section className="password-form">
              <form id="change-password-form" onSubmit={this.updatePassword}>
                <h3>Change Your Password</h3>
                <div className="col-4">
                  <label className="old-password" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Old Password"
                    onChange={this.handleOldPasswordChange}
                    value={oldPassword}
                  />
                </div>

                <div className="col">
                  <label className="new-password" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Password"
                    onChange={this.handleNewPasswordChange}
                    value={newPassword}
                  />
                </div>

                <div className="col">
                  <label className="confirm-new-password" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm New Password"
                    onChange={this.handleConfirmPasswordChange}
                    value={confirmPassword}
                  />
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </section>
          </section>
          <Link to="/" type="button" className="btn btn-sm back-button">Back</Link>
        </section>
        <Footer />
        {!token && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Profile;
