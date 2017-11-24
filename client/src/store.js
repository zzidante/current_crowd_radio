
const defaultState = {
  loading: false,
  token: localStorage.token || '',
  tracklist: [],
  currentTrackIndex: 0,
  locationBar: "",
  country: "",
  city: "",
  type: "",
  playlists: {},
  favouritedSet: new Set(),
  playlistType: "",
  userMessage: "",
  email: "",
  defaultLocation: "",
  username: "",
  password: "",
  confirmPassword: "",
  modal: false,
  playing: false,
  volume: 0.8,
  duration: 0,
  loaded: 0,
  loadedSeconds: 0,
  played: 0,
  playedSeconds: 0
};
let state = {};

module.exports = {
  defaultState,
  state
}
