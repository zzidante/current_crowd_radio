import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import registerServiceWorker from './registerServiceWorker';

let state = {}
window.getState = () => state;
window.setState = (newState) => {
  state = {...state, ...newState}
  ReactDOM.render((
    <Routes />
  ), document.getElementById('root'));
}
window.setState({
  tracklist: [],
  currentTrackIndex: 0,
  locationBar: '',
  country: '',
  city: '',
  type: '',
  playlists: [],
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
  apikey: process.env.REACT_APP_JAMENDO_API
})
registerServiceWorker();