import React, { Component } from "react";
import Controls from "./Controls.jsx";
import Tracklist from "./Tracklist.jsx";
import { getState, createFavouritedSet } from "../index";
class Player extends Component {
  componentDidMount(){
    createFavouritedSet()
  }
  
  render() {

    const { tracklist, currentTrackIndex, favouritedSet } = getState();
    const trackArray = tracklist.map((track, i) => {
      return <Tracklist key={track.id} track={track} index={i} favourited={ favouritedSet.has(track) }/>;
    });
    return (
      <section className="music-container col-md-6 col-md-pull-3 col-xs-12">
        <Controls
          key={"controls"}
          currentTrack={tracklist[currentTrackIndex]}
        />
        <section
          className={trackArray.length > 0 ? "full-playlist add-border" : "full-playlist"}>
          <table className="table table-striped table-condensed table-hover track-container">
            <tbody>{trackArray}</tbody>
          </table>
        </section>
      </section>
    );
  }
}

export default Player;
