import React, { Component } from 'react';
import Duration from './Duration';
import api from '../api'
class Tracklist extends Component {
  setCurrentTrack= () => {
    window.setState({currentTrackIndex: this.props.index})
  }

  addToPlayList = (event) => {
    const { value } = event.currentTarget
    const songId = this.props.track.id
    if (value === "archive") {
      api.moveToPlaylist(songId, value)
      return
    }
    if (value === "current" && window.getState().playlistType === "archive") {
      api.moveToPlaylist(songId, value)
      return
    }
    if (value === "current") {
      api.addToPlaylist( songId, value )
      return
    }
  }

  deleteFromPlaylist = () => {
    api.deleteFromPlaylist(this.props.track.id)
  }
  render() {
    const {name, artist, duration} = this.props.track
    return (
      <div className="track-container">
        <span className="track-play-btn"> <button onClick={this.setCurrentTrack}><i className="fa fa-play"></i></button></span>
        <span className="track-name">{name} by </span>
        <span className="track-artist">{artist} - </span> 
        <span className="track-duration"><Duration seconds = {duration} /> </span>
        <span className="track-btns">
          <button onClick={this.addToPlayList} value="current"><i className="fa fa-star"></i></button>
          <button onClick={this.addToPlayList} value="archive"><i className="fa fa-archive"></i></button>
          <button onClick={this.deleteFromPlayList}><i className="fa fa-trash"></i></button>
        </span>
      </div>
    )
  }
}

export default Tracklist;