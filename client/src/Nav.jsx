import React, { Component } from "react";
import Guest from "./NavMenu/Guest.jsx";
import LocationSearch from "./NavMenu/LocationSearch.jsx";
import BrandDeclaration from "./NavMenu/BrandDeclaration.jsx";
import UserMessage from "./UserMessage.jsx";
import LogoutButton from "./NavMenu/LogoutButton.jsx";
import Modals from "./NavMenu/Modals.jsx";
import { getState } from "./index";
import "./styles/css/index.css";

class Nav extends Component {
  render() {
    const { token, userMessage, modal } = getState();

    return (
      <header>
        <nav className="navbar">
          <BrandDeclaration />
          <LocationSearch />
          <Modals />

          {/* if user is not authenticated, show auth options */}
          {(!token || token === 'guest') && <Guest />}

          {/* if user is authenticated, show logout */}
          {token && token !== 'guest' && <LogoutButton />}
        </nav>
        <div className="user-message">
          {userMessage && <UserMessage userMessage={userMessage} />}
        </div>
      </header>
    );
  }
}

export default Nav;
