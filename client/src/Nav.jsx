import React, { Component } from "react";
import Guest from "./NavMenu/Guest.jsx";
import LocationSearch from "./NavMenu/LocationSearch.jsx";
import BrandDeclaration from "./NavMenu/BrandDeclaration.jsx";
import LogoutButton from "./NavMenu/LogoutButton.jsx";
import Modals from "./NavMenu/Modals.jsx";
import { getState } from "./index";
import UserMessage from "./UserMessage.jsx"
class Nav extends Component {
  render() {
    const { token, modal, userMessage } = getState();
    const divStyle = {
      position: "relative"
    }
    return (
      <header>
        <nav className="navbar">
          <BrandDeclaration />
          <div style={divStyle} >
          <LocationSearch />
          {!modal && userMessage && <UserMessage userMessage={userMessage}/>}
          </div>
          <Modals />

          {/* if user is not authenticated, show auth options */}
          {(!token || token === 'guest') && <Guest />}

          {/* if user is authenticated, show logout */}
          {token && token !== 'guest' && <LogoutButton />}
        </nav>
      </header>
    );
  }
}

export default Nav;
