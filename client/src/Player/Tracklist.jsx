import React, { Component } from 'react';
import Duration from './Duration';
import api from '../api'
class Tracklist extends Component {
  setCurrentTrack= () => {
    window.setState({currentTrackIndex: this.props.index})
  }

  addToPlaylist = ({ currentTarget: { value }}) => {
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
    console.log(this.props.track.id, window.getState().playlistType);
    api.deleteFromPlaylist(this.props.track.id, window.getState().playlistType)
  }
  render() {
    const {name, artist, duration} = this.props.track
    const { userId, playlistType } = window.getState()
    return (
      <div className="track-container">
        <span className="track-play-btn"> <button onClick={this.setCurrentTrack}><i className="fa fa-play"></i></button></span>
        <span className="track-name">{name} by </span>
        <span className="track-artist">{artist} - </span> 
        <span className="track-duration"><Duration seconds = {duration} /> </span>
        { userId && 
          userId !== "guest" && 
          <span className="track-btns">
            { playlistType !== "current" && <button onClick={this.addToPlaylist} value="current"><i className="fa fa-star"></i></button> }
            { playlistType === "current" && <button onClick={this.addToPlaylist} value="archive"><i className="fa fa-archive"></i></button> }
            { playlistType !== "" && <button onClick={this.deleteFromPlaylist}><i className="fa fa-trash"></i></button> }
          </span> 
        }
      </div>
    )
  }
}

export default Tracklist;