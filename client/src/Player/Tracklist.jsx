import React, { Component } from "react";
import Duration from "./Duration";
import api from "../api/internal";
import { setState, getState} from "../index";
class Tracklist extends Component {
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

  render() {
    const { name, artist, duration, favourited } = this.props.track;
    const { token, playlistType } = getState();
    const star = favourited ? (<button className="btn-link"  onClick={this.deleteFromPlaylist} value="current">
    <i className="fa fa-star" />
  </button>) :
   (<button className="btn-link"  onClick={this.addToPlaylist} value="current">
   <i className="fa fa-star-o" />
  </button>)
    return (
      <tr onDoubleClick={this.setCurrentTrack} className="track-single">
        <td>
          <div className="track-play-btn">
            {" "}
            <button onClick={this.setCurrentTrack}>
              <i className="fa fa-play" />
            </button>
          </div>
        </td>
        <td>
          <span className="track-name">{name}</span>
          <span className="track-artist">{artist}</span>
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
