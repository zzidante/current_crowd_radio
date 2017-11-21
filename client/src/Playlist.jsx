import React , {Component} from 'react';
import api from './api'

class Playlist extends Component {
  setPlaylistType = ({ currentTarget: { value }}) => {
    window.setState({playlistType: value})
    if (value === ""){
      api.getTracksByLocation()
      return
    }
    api.getTracksById()
  }
  render() {
    const { playlists, locationBar, userId } = window.getState()
    const loc = playlists[locationBar]
    return (
      <section className="playlist-heading col-md-3 col-md-push-6 col-xs-6">
        <article className="playlist-box">
          <div className="current-track-player">
          </div>
          <div className="playlist-selection-buttons">
            {userId && <button onClick={this.setPlaylistType} className="btn btn-primary" value="">Randomize</button>}
            {loc && loc.current && <button onClick={this.setPlaylistType} className="btn btn-primary" value="current">Current Playlist</button> }
            {loc && loc.archive && <button onClick={this.setPlaylistType} className="btn btn-primary" value="archive">Archive Playlist</button> }
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

