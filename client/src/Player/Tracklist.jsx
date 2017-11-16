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
      <div className="track">
        <img src={image} />
        <span>{artist}</span> 
        <span>{album}</span>
        <span><Duration seconds = {duration} /> </span>
        <span><button onClick={this.setTrack}><i className="fa fa-play"></i></button></span>
      </div>
  )
  }
}

export default Tracklist;