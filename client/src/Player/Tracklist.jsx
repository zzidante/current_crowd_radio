import React, { Component } from "react";
import Duration from "./Duration";
import api from "../api/internal";
import { setState, getState} from "../index";
class Tracklist extends Component {
  constructor(){
    super()
    this.state = {
      trackScroll: ''
    }
  }
  setCurrentTrack = () => {
    setState({ currentTrackIndex: this.props.index });
  };

  addToPlaylist = ({ currentTarget: { value } }) => {
    const songId = this.props.track.id;
    const i = this.props.index
    if (value === "archive") {
      api.moveToPlaylist(songId, i, value);
      return;
    }
    if (value === "current" && getState().playlistType === "archive") {
      api.moveToPlaylist(songId, i, value);
      return;
    }
    if (value === "current") {
      api.addToPlaylist(songId, i, value);
      return;
    }
  };

  deleteFromPlaylist = () => {
    const from = getState().playlistType === "archive" ? "archive" : "current"
    api.deleteFromPlaylist(this.props.track.id, this.props.index, from);
  };

  startScroll = () => {
    const textWidth = document.getElementById(this.props.index).offsetWidth;
    const containerWidth = document.getElementsByClassName("track-name-container")[0].offsetWidth;
    if (textWidth > containerWidth){
      this.setState({trackScroll:"trackScroll"})
    }
  }

  stopScroll = () => {
    this.setState({trackScroll:''})
  }

  render() {
    const { name, artist, duration, favourited } = this.props.track;
    const { token, playlistType } = getState();

    const star = favourited ? (<button className="btn-link"  onClick={this.deleteFromPlaylist} value="current">
    <i className="fa fa-star" />
  </button>) :
   (<button className="btn-link"  onClick={this.addToPlaylist} value="current">
   <i className="fa fa-star-o" />
  </button>)

    const invStyle = {
      display: "none"
    }

    return (
      <tr onDoubleClick={this.setCurrentTrack} onMouseEnter={this.startScroll} onMouseLeave={this.stopScroll} className="track-single">
        <td>
          <div className="track-play-btn">
            {" "}
            <button onClick={this.setCurrentTrack}>
              <i className="fa fa-play" />
            </button>
          </div>
        </td>
        <td id={this.state.trackScroll} className="track-name-container">
          <span id={this.props.index} className="track-name">{name} - <b>{artist}</b></span>
        </td>
        <td>
          <div className="track-duration">
            <Duration seconds={duration} />
          </div>
        </td>
        <td>
          {token &&
            token !== "guest" && (
              <span className="track-btns">
                {playlistType !== "current" && 
                star }
                {playlistType === "current" && (
                  <button className="btn-link" onClick={this.addToPlaylist} value="archive">
                    <i className="fa fa-archive" />
                  </button>
                )}
                {playlistType !== "" && (
                  <button className="btn-link" onClick={this.deleteFromPlaylist}>
                    <i className="fa fa-trash" />
                  </button>
                )}
              </span>
            )}
        </td>
      </tr>
    );
  }
}

export default Tracklist;
