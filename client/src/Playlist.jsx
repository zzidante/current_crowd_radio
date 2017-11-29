import React, { Component } from 'react';
import api from './api/jamendo'
import { getState, setState } from './index'
import Name from './User/Name.jsx'

class Playlist extends Component {
  setPlaylistType = ({ currentTarget: { value } }) => {
    setState({ currentTrackIndex: 0, playing: false })
    if (value === "") {
      api.getTracksByLocation()
      return
    }
    api.getTracksById(value)
  }
  render() {
    const { playlists, locationBar, token } = getState()
    const loc = playlists[locationBar]
    return (
      <section className="playlist-heading col-md-3 col-md-push-6 col-xs-6">
        <Name />
        <div className="playlist-selection-buttons">
          <h4>
            <em>You are in...<br /> </em>{locationBar}
          </h4>
          {token &&
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="">Randomize</button>}

          {loc &&
            loc.current &&
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="current">Current Playlist</button>}

          {loc &&
            loc.archive &&
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="archive">Archive Playlist</button>}
        </div>
      </section>
    )
  }
}

export default Playlist;

