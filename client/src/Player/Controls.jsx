import React, { Component } from "react";
import ReactPlayer from "react-player";
import Duration from "./Duration";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.8,
      muted: false,
      duration: 0,
      loop: false
    }

  }
  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  stop = () => {
    this.setState({ currentTrack: null, playing: false });
  };

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  setVolume = event => {
    this.setState({ volume: parseFloat(event.target.value) });
  };

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  onSeekChange = event => {
    this.setState({ played: parseFloat(event.target.value) });
  };

  onSeekMouseUp = event => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(event.target.value));
  };

  onProgress = state => {
    // Progress only if not seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  }
  ref = player => {
    this.player = player;
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
    } = this.state;

    if (this.props.currentTrack) {
      return (
        <div>
          <ReactPlayer
            ref={this.ref}
            url={this.props.currentTrack.trackHREF}
            className="audio-player"
            volume={volume}
            muted={muted}
            loop={loop}
            playing={playing}
            onProgress={this.onProgress}
            onEnded={() => this.setState({ playing: loop })}
            onDuration={duration => this.setState({ duration })}
          />
          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.props.previous}><i className="fa fa-angle-double-left"></i> </button>
                  <button onClick={this.stop}><i className="fa fa-stop"></i></button>
                  <button onClick={this.playPause}>
                    {playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>
                  <button onClick={this.props.next}><i className="fa fa-angle-double-right"></i> </button>
                </td>
              </tr>
              <tr>
                <th>Seek</th>
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
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.setVolume}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={muted}
                      onChange={this.toggleMuted}
                    />{" "}
                    Muted
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={loop}
                      onChange={this.toggleLoop}
                    />{" "}
                    Loop
                  </label>
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td>
                  <progress max={1} value={played} />
                </td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td>
                  <progress max={1} value={loaded} />
                </td>
              </tr>
              <tr>
                <th>elapsed</th>
                <td>
                  <Duration seconds={duration * played} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    return <div className="App">Loading...</div>;
  }

}

export default Controls;