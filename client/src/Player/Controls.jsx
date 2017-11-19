import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';

class Controls extends Component {
  playPause = () => {
    window.setState({ playing: !window.getState().playing });
  };

  stop = () => {
    window.setState({ currentTrack: null, playing: false });
  };

  toggleLoop = () => {
    window.setState({ loop: !window.getState().loop });
  };

  setVolume = event => {
    window.setState({ volume: parseFloat(event.target.value) });
  };

  toggleMuted = () => {
    window.setState({ muted: !window.getState().muted });
  };

  onSeekMouseDown = () => {
    window.setState({ seeking: true });
  };

  onSeekChange = event => {
    window.setState({ played: parseFloat(event.target.value) });
  };

  onSeekMouseUp = event => {
    window.setState({ seeking: false });
    this.player.seekTo(parseFloat(event.target.value));
  };

  onProgress = state => {
    // Progress only if not seeking
    if (!window.getState().seeking) {
      window.setState(state);
    }
  }
  ref = player => {
    this.player = player;
  }
  onEnded = () => {
    window.setState({playing: window.getState().loop})
  }
  onDuration = ( duration ) => {
    window.setState({ duration })
  }
  nextTrack = () => {
    window.setState({currentTrackIndex: window.getState().currentTrackIndex + 1 })
  }
  previousTrack = () => {
    window.setState({currentTrackIndex: window.getState().currentTrackIndex - 1 })
  }

  render() {

    const {
      playing,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration
    } = window.getState();
    const { currentTrack } = this.props
      const trackURL = currentTrack ? currentTrack.trackHREF : '';
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
          <div className="player-image-bg"></div>
          <table className="current-song-container">
            <tbody>
              
              {/* <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={loop}
                      onChange={this.toggleLoop}
                    />{' '}
                    Loop
                  </label>
                </td>
              </tr> */}

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
                </td>
              </tr>

              <tr>
                <td>
                  <th>Playedd</th>
                  <progress max={1} value={played} className="track-progress"/>
                </td>
              </tr>

              <tr>
                <td>
                  <th>Loaded</th>
                  <progress max={1} value={loaded} className="track-progress loaded-bar"/>
                </td>
              </tr>

              <tr>

                <td>
                  <th>Elapsed</th>
                  <Duration seconds={duration * played} />
                </td>
              </tr>

              <tr>
                <td className="player-controls">
                  <button onClick={this.previousTrack}><i className="fa fa-angle-double-left"></i> </button>
                  <button onClick={this.stop}><i className="fa fa-stop"></i></button>
                  <button onClick={this.playPause}>
                    {playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>
                  <button onClick={this.nextTrack}><i className="fa fa-angle-double-right"></i> </button>
                </td>
              </tr>

              <tr>
                <td>
                  <th>Volumee</th>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.setVolume}
                  />
                  {/* <label>
                    <input
                      type="checkbox"
                      checked={muted}
                      onChange={this.toggleMuted}
                    />{' '}
                    Muted
                  </label> */}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      );
    
  }

}

export default Controls;