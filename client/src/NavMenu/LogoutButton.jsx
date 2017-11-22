import React, { Component } from 'react';
import { DropdownButton, MenuItem } from "react-bootstrap";
import { resetState } from '../index'
class LogoutButton extends Component {

  logout = () => {
    resetState()
  }
  
  render() {
    return (
      <li>
        <button className="btn btn-primary lg-size-btn" onClick={this.logout}>Logout</button>
        <DropdownButton pullRight title={<i><span className="fa fa-bars"></span></i>}>
          <MenuItem>
          <button className="btn" onClick={this.logout}>Logout</button>
          </MenuItem>
        </DropdownButton>
      </li>


    )
  }
}

export default LogoutButton