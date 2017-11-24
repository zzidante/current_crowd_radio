import React , {Component} from 'react';
import api from './api/jamendo'
import { getState } from './index'
class Playlist extends Component {
  setPlaylistType = ({ currentTarget: { value }}) => {
    if (value === ""){
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
        <article className="playlist-box">
          <div className="current-track-player">
          </div>
          <div className="playlist-selection-buttons">
            {token && 
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="">Randomize</button>}

            {loc && 
            loc.current && 
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="current">Current Playlist</button> }
            
            {loc && 
            loc.archive && 
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="archive">Archive Playlist</button> }
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

