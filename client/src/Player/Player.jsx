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
        <section className="music-container col-md-6 col-md-pull-3 col-xs-12">
          <Controls key={"controls"} currentTrack={window.getState().tracklist[window.getState().currentTrackIndex]}/>
          <section className={trackArray.length > 0 ? "full-playlist add-border" : "full-playlist"}>
            <div className="track-container">
              {trackArray}
            </div>
          </section>
        </section>
    )
  }
}

export default Player
