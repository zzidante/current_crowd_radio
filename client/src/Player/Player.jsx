import React, { Component } from "react";
import Controls from './Controls.jsx'
import Tracklist from './Tracklist.jsx'
class Player extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTrack: ''
    }
  }

  nextTrack = () => {

  }

  previousTrack = () => {

  }

  setCurrentTrack = () => {

  }
  render() {
    return (
      <div>
        <Controls next={this.nextTrack} previous={this.previousTrack}/>
        <Tracklist tracklist={this.props.tracklist} selectTrack={this.setCurrentTrack}/>
      </div>
    )
  }
}

export default Player
