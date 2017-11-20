import React , {Component} from 'react';
import api from './api'

class Playlist extends Component {
  setPlaylistType = event => {
    window.setState({playlistType: event.currentTarget.value})
    api.getTracksById()
  }
  render() {
    return (
      <section className="playlist-heading col-md-3 col-md-push-6 col-xs-6">
        <article className="playlist-box">
          <div className="current-track-player">
          </div>
          <div className="playlist-selection-buttons">
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="">Randomize</button>
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="current">Current Playlist</button>
            <button onClick={this.setPlaylistType} className="btn btn-primary" value="archive">Archive Playlist</button>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

