import React, { Component } from "react";
import api from "../api/internal";
import PlacesAutocomplete from "react-places-autocomplete";
import validation from '../validation'
import { setState, getState } from '../index'
class Login extends Component {
  handleUsernameChange = event =>
    setState({ username: event.target.value });

  handlePasswordChange = event =>
    setState({ password: event.target.value });

  handleConfirmPasswordChange = event =>
    setState({ confirmPassword: event.target.value });

  handleEmailChange = event => setState({ email: event.target.value });

  onChange = locationBar => setState({ locationBar });

  register = event => {
    event.preventDefault();
    const {
      username,
      email,
      password,
      confirmPassword,
      locationBar
    } = getState();
    if (validation.register(username, email, password, confirmPassword, locationBar)) {
      api.registerUser(username, email, password, locationBar);
    }
  };

  render() {
    const myStyles = {
      input: {
        display: "block",
        width: "100%",
        height: "34px",
        padding: "6px 12px",
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
      value: getState().locationBar,
      onChange: this.onChange,
      placeholder: "default city",
      id: "register-location"
    };
    const { email, username, password, confirmPassword } = getState();
    return (
      <div className="form-group">
        <form id="register" onSubmit={this.register} autoComplete="off">
          <input
            className="form-control"
            type="email"
            placeholder="email"
            value={email}
            onChange={this.handleEmailChange}
          />
          <input
            className="form-control"
            type="text"
            placeholder="username"
            value={username}
            onChange={this.handleUsernameChange}
          />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
          <input
            className="form-control"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
          <PlacesAutocomplete inputProps={inputProps} styles={myStyles} />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
