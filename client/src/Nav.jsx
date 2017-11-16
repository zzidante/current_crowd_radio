import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <header>
        <h3><img class="brand-icon" src=""></img></h3>
        <h3><a href="#">Current Crowd Radio</a></h3>
        <form>
          <input type="email" placeholder="City"></input>
          <a href="#" class="btn">Change City</a>
        </form>
        <nav>
          <li><a href="#">Register</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Guest</a></li>
          <li>Hello</li>
        </nav>
      </header>
    )

  }
}

export default Nav;