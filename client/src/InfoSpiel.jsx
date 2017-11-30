import React, { Component } from "react";

class InfoSpiel extends Component {
  render() {

    return (
      <ul>
        <li className="title-li">What is Current Crowd Radio?</li>
        <li className="company-description">Current Crowd Radio is about discovering local music. </li>
        <li className="company-description">Powered by the Jamendo library, it accesses over 500k songs spread far and wide across the world. </li>
        <li className="company-description">Try it by inputing a city and a country in the Search above.</li>
        <li className="company-description">Make an account and save your favorite tracks from different cities to your Current Playlist!</li>
        <li className="company-description">Or, archive your old finds and never lose those references, even as your tastes change.</li>
        <li className="company-description">Made for music adventurists, by music adventurists.</li>
      </ul>
    );
  }
}

export default InfoSpiel
;
