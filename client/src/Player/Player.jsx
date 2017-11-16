import React, { Component } from "react";
import Controls from './Controls.jsx'
import Tracklist from './Tracklist.jsx'
class Player extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTrackIndex: 0
    }
  }

  nextTrack = (event) => {
    console.log(event);
    this.setState({currentTrackIndex: this.state.currentTrackIndex + 1 })
  }

  previousTrack = (event) => {
    console.log(event);
    this.setState({currentTrackIndex: this.state.currentTrackIndex - 1 })
  }

  setCurrentTrack = (index) => {
    this.setState({currentTrackIndex: index})
  }
  render() {
    const trackArray = this.props.tracklist.map( (track, i) => {
      return (
        <Tracklist key={track.id} track={track} selectTrack={this.setCurrentTrack} index={i}/>
      )
    })

    return (
      <div>
        <Controls next={this.nextTrack} previous={this.previousTrack} currentTrack={this.props.tracklist[this.state.currentTrackIndex]}/>
        <div className="track-container">
          {trackArray}
        </div>
      </div>
    )
  }
}

export default Player
