import React, { Component } from "react";
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";
class Login extends Component {
  handleUsernameChange = event =>
    window.setState({ username: event.target.value });
  handlePasswordChange = event =>
    window.setState({ password: event.target.value });
  handleConfirmPasswordChange = event =>
    window.setState({ confirmPassword: event.target.value });
  handleEmailChange = event => window.setState({ email: event.target.value });
  onChange = locationBar => window.setState({ locationBar });
  register = event => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = window.getState();
    if (!username || !email || !password || !confirmPassword) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    if (password !== confirmPassword) {
      window.setState({ warning: "Passwords must match" });
      return;
    }
    axios
      .post("http://localhost:8081/users", {
        username,
        email,
        password
      })
      .then(res => {
        window.setState({ warnings: [] });
        console.log(res.data);
        const { userId } = res.data;
        console.log(userId);
        if (userId) {
          window.setState({ userId, password: "" });
        }
      });
  };

  render() {
    const myStyles = {
      input: {
        display: 'inline-block',
        width: '100%',
        color: "black",
        fontFamily: "'Open Sans', 'sans-serif'"
      }
    };
    const inputProps = {
      value: window.getState().locationBar,
      onChange: this.onChange
    };
    const { email, username, password, confirmPassword } = window.getState();
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
          <PlacesAutocomplete
            className="form-control"
            id="location-search"
            inputProps={inputProps}
            styles={myStyles}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
