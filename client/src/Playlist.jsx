import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section className="playlist-heading col-md-3 col-md-push-6 col-xs-6">
        <article className="playlist-box">
          <div className="current-track-player">
          </div>
          <div className="playlist-selection-buttons">
            <button className="btn btn-primary">Randomize</button>
            <button className="btn btn-primary">Current Playlist</button>
            <button className="btn btn-primary">Archive Playlist</button>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

