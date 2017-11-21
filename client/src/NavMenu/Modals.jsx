import React, { Component } from 'react';
import Login from "../User/Login.jsx";
import Register from "../User/Register.jsx";
import Warning from "../Warning.jsx";

import { Modal } from "react-bootstrap";


class Modals extends Component {

  logout = () => window.setState({ userId: "" });  
  closeModal = () => window.setState({ modal: false, warning: "" });
  
  
  render() {

    const { modal, warning } = window.getState();
    
    return (
      <div>
        <Modal show={!!modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modal === "login" && "Login"}
              {modal === "register" && "Register"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modal === "login" && <Login />}
            {modal === "register" && <Register />}
          </Modal.Body>
          <Modal.Footer>
            {warning && <Warning warning={warning} />}
          </Modal.Footer>
        </Modal>
        </div>
    )
  }
}

export default Modals