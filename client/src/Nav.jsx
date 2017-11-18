import React, { Component } from "react";
import Login from "./User/Login.jsx";
import Register from "./User/Register.jsx";
import Warning from "./Warning.jsx";
import { Modal } from "react-bootstrap";
import PlacesAutocomplete from "react-places-autocomplete";
import iso from "iso-3166-1";
import axios from "axios";
class Nav extends Component {
  guest = () => window.setState({ userId: "guest" });
  closeModal = ()=> window.setState({ modal: false });
  openModal = (event) => { 
    console.log(event.target.value);
    event.preventDefault(); 
    window.setState({ modal: event.target.value }); 
  }
  logout = () => window.setState({ userId: "" });

  onChange = locationBar => window.setState({ locationBar });

  setLocation = event => {
    event.preventDefault();
    const loc = window.getState().locationBar;
    const city = loc.match(/^\w+[a-z]?/i)[0];
    const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0]);
    if (isoCodes) {
      window.setState({ county: isoCodes.alpha3, city });
      this.getTracks(isoCodes.alpha3, city);
    } else {
      console.log("none found");
    }
  };
  getTracks = (country, city) => {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/locations/?client_id=b48755b6&format=jsonpretty&limit=40&haslocation=true&location_country=${country}&location_city=${city}`
      )
      .then(response => {
        let artistArray = [];
        response.data.results.forEach(artist => {
          artistArray.push(Number(artist.id));
        });
        axios
          .get(
            `https://api.jamendo.com/v3.0/artists/tracks/?client_id=b48755b6&format=jsonpretty&limit=40&id=${artistArray.join(
              "+"
            )}`
          )
          .then(artistTracks => {
            let trackArray = [];
            artistTracks.data.results.forEach(tracklist => {
              const track =
                tracklist.tracks[
                  Math.floor(Math.random() * tracklist.tracks.length)
                ];
              trackArray.push({
                id: track.id,
                name: track.name,
                trackHREF: track.audio,
                artist: tracklist.name,
                album: track.album_name,
                image: track.image,
                duration: track.duration
              });
            });
            window.setState({ tracklist: trackArray });
          });
      });
  };

  render() {
    const myStyles = {
      input: {
        color: "black",
        width: "20vw",
        fontFamily: "'Open Sans', 'sans-serif'"
      }
    };
    const inputProps = {
      value: window.getState().locationBar,
      onChange: this.onChange,
      onSelect: this.onDropdownSelect
    };
    const {modal, warning, userId} = window.getState()
    return (
      <header>
        <h3>
          <img className="brand-icon" src="" />
        </h3>
        <h3>
          <a href="#">Current Crowd Radio</a>
        </h3>

        <form onSubmit={this.setLocation}>
          <PlacesAutocomplete
            id="location-search"
            inputProps={inputProps}
            styles={myStyles}
          />
          <button type="submit" className="btn btn-secondary main-btn">
            Submit
          </button>
        </form>

        {userId === "" && (
          <nav>
            <form id="login">
              <button className="btn btn-primary" name="type" value="login" onClick={this.openModal}>Login</button>
            </form>
            <form id="register">
              <button className="btn btn-primary" name="type" value="register" onClick={this.openModal}>Register</button>
            </form>
              <Modal show={modal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                  {modal === "login" && "Login"}
                  {modal === "register" && "Register"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  { modal === "login" && <Login />}
                  { modal === "register" && <Register />}
                </Modal.Body>
                <Modal.Footer>
                  {warning && (
                    <Warning warning={warning} />
                  )}
                </Modal.Footer>
              </Modal>
            <a className="btn btn-primary" onClick={this.guest}>Guest</a>
          </nav>
        )}
        {userId && (
          <nav>
            <li>
              <a onClick={this.logout}>Logout</a>
            </li>
          </nav>
        )}
      </header>
    );
  }
}

export default Nav;
