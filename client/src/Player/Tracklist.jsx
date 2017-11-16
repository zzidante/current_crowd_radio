import React, { Component } from "react";
import Duration from "./Duration";
class Tracklist extends Component {
  constructor(props) {
    super(props);
  }
  setTrack = event => {
    this.props.selectTrack(this.props.index)
  }
  render() {
    const {id, trackHREF, name, artist, album, image, duration} = this.props.track
    return (
      <div className="track-container">
        <img className= "track-art" src={image} />
        <span className="track-artist">{artist}</span> 
        <span className="track-album">{album}</span>
        <span className="track-duration"><Duration seconds = {duration} /> </span>
        <span className="track-play-btn"><button onClick={this.setTrack}><i className="fa fa-play"></i></button></span>
      </div>
  )
  }
}

export default Tracklist;