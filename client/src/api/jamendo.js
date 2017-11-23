import axios from "axios";
import iso from "iso-3166-1";
import { setState, getState } from '../index';


const API_KEY = process.env.REACT_APP_JAMENDO_API || 'b48755b6';
const MAX_ARTISTS = 50;
// Converts text to city/county codes, sets state, and loads new tracklist.
const setLocation = () => {
  const loc = getState().locationBar;
  const city = loc.match(/^\w+[a-z]?/i)[0];
  const isoCodes = iso.whereCountry(loc.match(/(\w+\s)?\w+.?$/)[0]);
  if (isoCodes) {
    setState({ country: isoCodes.alpha3, city });
  }
};

// given a country and city loads random list of songs
const getTracksByLocation = () => {
  const { country, city } = getState();
  axios.get(
    `https://api.jamendo.com/v3.0/artists/locations/?client_id=${API_KEY}&format=jsonpretty&limit=1&haslocation=true&location_country=${country}&location_city=${city}&fullcount=true`
  ).then( artistCount => {
    if (artistCount.data.headers.results_fullcount < 1) {
      setState({
        warning:
          "We're sorry, we could not find any artists for that city."
      });
      console.log("No results");
      return;
    }
    const offset = Math.floor((Math.random() * artistCount.data.headers.results_fullcount + 1));
    axios.get(
      `https://api.jamendo.com/v3.0/artists/locations/?client_id=${API_KEY}&format=jsonpretty&limit=${MAX_ARTISTS}&haslocation=true&location_country=${country}&location_city=${city}&offset=${offset}`
    ).then( artists => {
      let artistArray = [];
      artists.data.results.forEach( artist => {
        artistArray.push(artist.id);
      });
      if(artistArray.length < MAX_ARTISTS) {
        const artistArrayFill = MAX_ARTISTS - artistArray.length;
        axios.get(
          `https://api.jamendo.com/v3.0/artists/locations/?client_id=${API_KEY}&format=jsonpretty&limit=${artistArrayFill}&haslocation=true&location_country=${country}&location_city=${city}`
        ).then( artists => {
          artists.data.results.forEach( artist => {
            artistArray.push(artist.id);
          });
        });
      }
      return artistArray;
    }).then( artistArray => {
      axios.get(
        `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=40&id=${artistArray.join("+")}`
      ).then( artistTracks => {
        let trackArray = [];
        artistTracks.data.results.forEach(tracklist => {
          const track =
            tracklist.tracks[
              Math.floor(Math.random() * tracklist.tracks.length)
            ];
          trackArray.push({
            id: track.id,
            name: track.name,
            trackHREF: track.audio,
            artist: tracklist.name,
            album: track.album_name,
            image: track.image,
            duration: track.duration
          });
        });
        setState({ tracklist: trackArray, warning: '' });
      });
    });
  });
};

const getTracksById = () => {
  const { playlists, playlistType, locationBar } = getState();
  const trackArray = playlists[locationBar][playlistType];
  if (trackArray) {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=40&track_id=${trackArray.join(
          "+"
        )}`
      )
      .then(res => {
        const trackArray = [];
        res.data.results.forEach(track => {
          const info = track.tracks[0];
          trackArray.push({
            id: info.id,
            name: info.name,
            trackHREF: info.audio,
            artist: track.name,
            album: info.album_name,
            image: info.image,
            duration: info.duration
          });
        });
        setState({ tracklist: trackArray });
      })
      .catch(() => {
        setState({
          warning:
            "We're sorry, something went wrong, please try again later."
        });
      });
  } else {
    setState({ tracklist: [] });
  }
};
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById
};
