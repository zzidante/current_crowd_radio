import React, { Component } from "react";
import Duration from "./Duration";
import api from "../api/internal";
import { setState, getState} from "../index";
class Tracklist extends Component {
  constructor(){
    super()
    this.state = {
      fav: 'fa fa-star-o'
    }
  }

  setCurrentTrack = () => {
    setState({ currentTrackIndex: this.props.index });
  };

  addToPlaylist = ({ currentTarget: { value } }) => {
    const songId = this.props.track.id;
    if (value === "archive") {
      api.moveToPlaylist(songId, value);
      return;
    }
    if (value === "current" && getState().playlistType === "archive") {
      api.moveToPlaylist(songId, value);
      return;
    }
    if (value === "current") {
      api.addToPlaylist(songId, value);
      this.setState({fav: "fa fa-star"})
      return;
    }
  };

  deleteFromPlaylist = () => {
    let from = getState().playlistType
    from ? from : "current"
    api.deleteFromPlaylist(this.props.track.id, from);
  };

  render() {
    const { name, artist, duration } = this.props.track;
    const { token, playlistType } = getState();
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
                <button className="btn-link"  onClick={this.addToPlaylist} value="current">
                  <i className={this.state.fav} />
                 </button> }
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
