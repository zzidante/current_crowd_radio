import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section className="back-img">
        <div className="hero"><img className="background-image" src={ require('./images/speaker.jpg') } /></div>
        <h2>Random City Playlist</h2>
        <article className="playlist-box">
          <div className="current-track-player">
            <p>Media Player Goes Here</p>
          </div>
          <div className="random-tracks-box">
            <p>Tracks Go Here</p>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;

