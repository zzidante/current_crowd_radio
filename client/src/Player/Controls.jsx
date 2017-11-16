import React, { Component } from "react";
import ReactPlayer from "react-player";
import Duration from "./Duration";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTrack: "",
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
  render() {

    const {
      currentTrack,
      playing,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration
    } = this.props;

    if (this.props.currentTrack) {
      return (
        <div>
          <ReactPlayer
            ref={this.ref}
            url={currentTrack}
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
                  <button onClick={this.stop}>Stop</button>
                  <button onClick={this.playPause}>
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button onClick={this.onClickFullscreen}>Fullscreen</button>
                  <button onClick={this.setPlaybackRate} value={1}>
                    1
                  </button>
                  <button onClick={this.setPlaybackRate} value={1.5}>
                    1.5
                  </button>
                  <button onClick={this.setPlaybackRate} value={2}>
                    2
                  </button>
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
                <th>duration</th>
                <td>
                  <Duration seconds={duration} />
                </td>
              </tr>
              <tr>
                <th>elapsed</th>
                <td>
                  <Duration seconds={duration * played} />
                </td>
              </tr>
              <tr>
                <th>remaining</th>
                <td>
                  <Duration seconds={duration * (1 - played)} />
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