import React, { Component } from 'react';
import Duration from './Duration';
class Tracklist extends Component {
  setCurrentTrack= () => {
    window.setState({currentTrackIndex: this.props.index})
  }
  render() {
    const {name, artist, album, image, duration} = this.props.track
    return (
      <div className="track-container">
        <span className="track-play-btn"> <button onClick={this.setCurrentTrack}><i className="fa fa-play"></i></button></span>
        {/* <img className= "track-art" src={image} /> */}
        <span className="track-name">{name} by </span>
        <span className="track-artist">{artist} - </span> 
        {/* <span className="track-album">{album} -- </span> */}
        <span className="track-duration"><Duration seconds = {duration} /> </span>
      </div>
    )
  }
}

export default Tracklist;