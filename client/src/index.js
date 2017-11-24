import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes.jsx";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import api from "./api/internal";

export const getState = () => store.state;
export const setState = newState => {
  store.state = { ...store.state, ...newState };
  ReactDOM.render(<Routes />, document.getElementById("root"));
};
export const resetState = () => {
  setState(store.defaultState);
};

export const createFavouritedSet = () => {
  const { playlists, locationBar, tracklist, currentTrackIndex } = getState();
  if (playlists[locationBar]){
    const tracks = playlists[locationBar]["current"];
    // Create set of intersecting user's current tracklist and random tracklist
    setState({favouritedSet: new Set(tracklist.filter(x => tracks.includes(x)))})
  }
}

resetState();
if (getState().token) {
  api.getUser(getState().token);
}

registerServiceWorker();
