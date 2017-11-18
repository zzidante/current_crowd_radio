import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

class Login extends Component {
  handleUsernameChange = event =>
    window.setState({ username: event.target.value });
  handlePasswordChange = event =>
    window.setState({ password: event.target.value });
  handleConfirmPasswordChange = event =>
    window.setState({ confirmPassword: event.target.value });
  handleEmailChange = event => window.setState({ email: event.target.value });

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
    const { email, username, password, confirmPassword } = window.getState();
    return (
      <div>
        <form onSubmit={this.register} autoComplete="off">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={this.handleEmailChange}
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={this.handleUsernameChange}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={this.handleConfirmPasswordChange}
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
