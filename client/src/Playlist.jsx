import React , {Component} from 'react';

class Playlist extends Component {
  render() {
    return (
      <section class="hero">
        <div class="background-image" style="background-image: url(assets/img/speaker.jpg);"></div>
        <h2>Random City Playlist</h2>
        <article class="playlist-box">
          <div class="current-track-player">
            <p>Media Player Goes Here</p>
          </div>
          <div class="random-tracks-box">
            <p>Tracks Go Here</p>
          </div>
        </article>
      </section>
    )
  }
}
  
export default Playlist;
    