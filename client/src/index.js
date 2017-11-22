import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import registerServiceWorker from './registerServiceWorker';

window.defaultState = {
    tracklist: [],
    currentTrackIndex: 0,
    locationBar: '',
    country: '',
    city: '',
    type: '',
    playlists: {},
    playlistType: '',
    warning: '',
    userId: '',
    username: '',
    password: '',
    confirmPassword: '',
    modal: false,
    playing: false,
    volume: 0.8,
    muted: false,
    duration: 0,
    loop: false,
    loaded: 0,
    loadedSeconds: 0,
    played: 0,
    playedSeconds: 0
}
let state = {}
window.getState = () => state;
window.setState = (newState) => {
  state = {...state, ...newState}
  ReactDOM.render((
    <Routes />
  ), document.getElementById('root'));
}
window.setState(window.defaultState)
registerServiceWorker();