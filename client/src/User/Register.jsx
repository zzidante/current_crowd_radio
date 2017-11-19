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
    const {
      username,
      email,
      password,
      confirmPassword,
      locationBar
    } = window.getState();
    if (!username || !email || !password || !confirmPassword || !locationBar) {
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
        password,
        detaultLocation: locationBar
      })
      .then(res => {
        window.setState({ warning: "" });
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
      value: window.getState().locationBar,
      onChange: this.onChange,
      placeholder: "default city",
      id: "register-location"
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
