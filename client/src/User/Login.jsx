import React, { Component } from "react";
import api from "../api/internal";
import { setState, getState } from "../index";
import "../styles/css/index.css";

class Login extends Component {
  handleEmailChange = event => setState({ email: event.target.value });
  handlePasswordChange = event => setState({ password: event.target.value });

  login = event => {
    event.preventDefault();
    const { email, password } = getState();
    if (!email || !password) {
      setState({
        userMessage: { message: "Please fill out all forms", style: "danger" }
      });
      return;
    }
    api.loginUser(email, password);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.login} className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="email"
            value={getState().email}
            onChange={this.handleEmailChange}
          />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            value={getState().password}
            onChange={this.handlePasswordChange}
          />
          <button className="btn btn-primary btn-login" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
