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
  tracklist: [{}],
  locationBar: '',
  country: '',
  city: '',
  type: '',
  user: '',
  currentTrackIndex: 0,
  userId: '123',
  playing: false,
  volume: 0.8,
  muted: false,
  duration: 0,
  loop: false,
  apikey: 'b48755b6'
})
registerServiceWorker();