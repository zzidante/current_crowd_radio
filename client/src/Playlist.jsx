import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section>
        <h2>Random Playlist</h2>
        <article className="playlist-box">
          <div className="current-track-player">
            <p>Media Player Goes Here Yeah!</p>
          </div>
          <div className="random-tracks-box">
            <p>Tracks Go Here wooooeeeooooddddoo</p>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

