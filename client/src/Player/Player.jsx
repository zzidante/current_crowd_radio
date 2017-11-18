import React, { Component } from 'react';
import Controls from './Controls.jsx'
import Tracklist from './Tracklist.jsx'
class Player extends Component {
  render() {
    const trackArray = window.getState().tracklist.map( (track, i) => {
      return (
        <Tracklist key={track.id} track={track} index={i}/>
      )
    })
    return (
      <div>
        <Controls currentTrack={window.getState().tracklist[window.getState().currentTrackIndex]}/>
        <div className="track-container">
          {trackArray}
        </div>
      </div>
    )
  }
}

export default Player
