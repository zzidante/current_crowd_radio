
const defaultState = {
  tracklist: [],
  currentTrackIndex: 0,
  locationBar: "",
  country: "",
  city: "",
  type: "",
  playlists: {},
  playlistType: "",
  warning: "",
  userId: localStorage.userId,
  email: "",
  defaultLocation: "",
  username: "",
  password: "",
  confirmPassword: "",
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
};
let state = {};

module.exports = {
  defaultState,
  state
}
