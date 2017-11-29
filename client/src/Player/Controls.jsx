import React, { Component } from "react";
import ReactPlayer from "react-player";
import Duration from "./Duration";
import { setState, getState } from "../index";
class Controls extends Component {
  playPause = () => {
    setState({ playing: !getState().playing });
  };

  stop = () => {
    setState({ currentTrack: null, playing: false });
  };

  setVolume = event => {
    setState({ volume: parseFloat(event.target.value) });
  };

  onSeekMouseDown = () => {
    setState({ seeking: true });
  };

  onSeekChange = event => {
    setState({ played: parseFloat(event.target.value) });
  };

  onSeekMouseUp = event => {
    setState({ seeking: false });
    this.player.seekTo(parseFloat(event.target.value));
  };

  onProgress = state => {
    // Progress only if not seeking
    if (!getState().seeking) {
      setState({ ...state });
    }
  };

  ref = player => {
    this.player = player;
  };

  onEnded = () => {
    const { currentTrackIndex, tracklist } = getState();
    if (currentTrackIndex < tracklist.length - 1) {
      this.nextTrack();
    }
  };

  onDuration = duration => {
    setState({ duration });
  };

  nextTrack = () => {
    const { currentTrackIndex, tracklist} = getState()
    if (currentTrackIndex < tracklist.length - 1){ 
      setState({
        currentTrackIndex: getState().currentTrackIndex + 1
      });
    }
  };

  previousTrack = () => {
    if (getState().currentTrackIndex > 0 ){
      setState({
        currentTrackIndex: getState().currentTrackIndex - 1
      });
    }
  };

  render() {
    const {
      playing,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration
    } = getState();

    const { currentTrack } = this.props;
    const trackURL = currentTrack ? currentTrack.trackHREF : "";

    return (
      <div className="player-full-container">
        <ReactPlayer
          ref={this.ref}
          url={trackURL}
          className="audio-player"
          volume={volume}
          muted={muted}
          loop={loop}
          playing={playing}
          onProgress={this.onProgress}
          onEnded={this.onEnded}
          onDuration={this.onDuration}
        />
        {currentTrack && (
          <div className="current-song-info">
            <h3>{currentTrack.name}</h3>
            <h4>{currentTrack.artist}</h4>
            <h5>{currentTrack.album}</h5>
            {currentTrack.website && <h5 className="artist-website"><a target="_blank" href={currentTrack.website}><i className="fa fa-globe"></i></a></h5>}
            <div
              className="player-image-bg"
              style={{ backgroundImage: `url(${currentTrack.image})` }}
            />

            <table className="current-song-container">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={played}
                      onMouseDown={this.onSeekMouseDown}
                      onChange={this.onSeekChange}
                      onMouseUp={this.onSeekMouseUp}
                      className="track-seeking"
                    />
                    <progress
                      max={1}
                      value={played}
                      className="track-progress"
                    />
                    <progress
                      max={1}
                      value={loaded}
                      className="track-progress loaded-bar"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Duration seconds={duration * played} />
                  </td>
                </tr>

                <tr>
                  <td className="player-controls">
                    <button onClick={this.previousTrack}>
                      <i className="fa fa-fast-backward" />{" "}
                    </button>
                    <button onClick={this.stop}>
                      <i className="fa fa-stop" />
                    </button>
                    <button onClick={this.playPause}>
                      {playing ? (
                        <i className="fa fa-pause" />
                      ) : (
                        <i className="fa fa-play" />
                      )}
                    </button>
                    <button onClick={this.nextTrack}>
                      <i className="fa fa-fast-forward" />{" "}
                    </button>
                  </td>
                </tr>

                <tr id="volume-bar-container">
                  <td>
                    <input
                      id="volume-controller"
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={this.setVolume}
                      className="volume-control"
                    />
                    <th id="volume-title"><i className="fa fa-volume-up" aria-hidden="true"></i></th>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Controls;
