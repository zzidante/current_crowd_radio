import React, { Component } from "react";
import { Redirect } from 'react-router';
import api from "../api/internal";
import validation from "../validation";
import { setState, getState } from "../index";
import PlacesAutocomplete from "react-places-autocomplete";
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
      root: {
        marginLeft: '0px',
        width: '100%'
      },
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

    const { email, username, newPassword, oldPassword, confirmPassword, token } = getState();

    const dashboardBackground = {
      top: '0',
      left: '0',
      marginTop: '0',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: 'black',
      // backgroundImage: 'url("https://www.hdwallpaperswizard.com/wp-content/uploads/2017/03/Black-Music-Wallpaper-HD-1366x768.jpg")',
      // TODO: adds extra scrollbar with vertical-heavy aspect-ratio but removes lack of element problem. 
      overflow: 'auto',
      width: '100%',
      zIndex: '-2',
    }

    return (
      <div id="main-content-spread">
        <Nav />
        <div style={dashboardBackground}>
          <section className="row">
            <section className="form-row">
              <section className="account-form">
                <form id="edit-account-form" onSubmit={this.updateUser} className="flex-outer">

                  <h3>Edit Your Account</h3>

                  <div className="col-auto">
                    <spicegirl>
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleUsernameChange}
                        value={username}
                      />
                    </spicegirl>
                  </div>

                  <div className="col-auto">
                    <spicegirl>
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleEmailChange}
                        value={email}
                      />
                    </spicegirl>
                  </div>

                  <div className="col-auto places-autocomplete">
                    <spicegirl>
                      <label>Default Location</label>
                      <PlacesAutocomplete
                        inputProps={inputProps}
                        onChange={this.onChange}
                        styles={myStyles}
                      />
                    </spicegirl>
                  </div>

                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary update-btn">
                      Update
                    </button>
                  </div>
                </form>
              </section>
            
              <section className="password-form">
                <form id="change-password-form" onSubmit={this.updatePassword} className="flex-outer">

                  <h3>Change Your Password</h3>

                  <div className="col">
                    <spicegirl>
                      <label>Current Password</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleOldPasswordChange}
                        value={oldPassword}
                      />
                    </spicegirl>
                  </div>

                  <div className="col">
                    <spicegirl>
                      <label>New Password</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleNewPasswordChange}
                        value={newPassword}
                      />
                    </spicegirl>
                  </div>

                  <div className="col">
                    <spicegirl>
                      <label>Confirm New Password</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleConfirmPasswordChange}
                        value={confirmPassword}
                      />
                    </spicegirl>
                  </div>

                  <div className="col">
                    <button type="submit" className="btn btn-primary update-btn">
                      Update
                    </button>
                  </div>
                </form>
              </section>
            </section>
          </section>
        </div>
        <Footer />
        {!token && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Profile;
