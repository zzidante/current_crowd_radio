import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  handleUsernameChange = event =>
    window.setState({ username: event.target.value });
  handlePasswordChange = event =>
    window.setState({ password: event.target.value });

  login = event => {
    event.preventDefault();
    const { username, password } = window.getState();
    if (!username || !password) {
      window.setState({ warning: "Please fill out all forms" });
      return;
    }
    axios
      .put("http://localhost:8081/users", {
        username: window.getState().username,
        password: window.getState().password
      })
      .then(res => {
        console.log(res.data);
        const { userId } = res.data;
        if (userId) {
          window.setState({ userId, password: "" });
        }
      });
  };
  render() {
    return (
      <div>
          <form id="login" onSubmit={this.login} className="form-group">
            <input
              type="email"
              placeholder="email"
              value={window.getState().username}
              onChange={this.handleUsernameChange}
            />
            <input
              type="password"
              placeholder="password"
              value={window.getState().password}
              onChange={this.handlePasswordChange}
            />          
        </form>
          </div>

    );
  }
}
export default Login;
