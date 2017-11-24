import React, { Component } from "react";
import Guest from "./NavMenu/Guest.jsx";
import LocationSearch from "./NavMenu/LocationSearch.jsx";
import BrandDeclaration from "./NavMenu/BrandDeclaration.jsx";
import LogoutButton from "./NavMenu/LogoutButton.jsx";
import Modals from "./NavMenu/Modals.jsx";
import { getState } from "./index";

class Nav extends Component {
  render() {
    const { token } = getState();

    return (
      <header>
        <nav className="navbar">
          <BrandDeclaration />
          <LocationSearch />
          <Modals />

          {/* if user is not authenticated, show auth options */}
          {!token && <Guest />}

          {/* if user is authenticated, show logout */}
          {token && <LogoutButton />}
        </nav>
      </header>
    );
  }
}

export default Nav;
