import React, { Component } from "react";
import Login from "../User/Login.jsx";
import Register from "../User/Register.jsx";
import UserMessage from "../UserMessage.jsx";

import { setState, getState } from "../index";
import { Modal } from "react-bootstrap";

class Modals extends Component {
  logout = () => setState({ token: "" });
  closeModal = () => setState({ modal: false, userMessage: "" });

  render() {
    const { modal, userMessage } = getState();

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

            {userMessage && <UserMessage userMessage={userMessage} />}

        </Modal>
      </div>
    );
  }
}

export default Modals;
