import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section className="hero">
        {/* <div className="background-image" style="background-image: url(assets/img/speaker.jpg);"></div> */}
        <div className="background-image"><img src={ require('./speaker.jpg') } /></div>
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
    