import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section className="playlist-heading col-md-3 col-md-push-6 col-xs-6">
        <h2>Random Playlist</h2>
        <article className="playlist-box">
          <div className="current-track-player">
            <p>Media Player Goes Here Yeah!</p>
          </div>
          <div className="random-tracks-box">
            <p>Tracks Go Here wooddddoo</p>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

