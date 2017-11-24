require("dotenv").config();

import axios from "axios";
require("promise.prototype.finally").shim();
import iso from "iso-3166-1";
import { setState, getState } from "../index";

const API_KEY = process.env.REACT_APP_JAMENDO_API;
const MAX_AMOUNT = 50;

// Checks if song from random playlist is already in the current location's playlist
function isFavourited(id, location){
    return location.current.includes(id)
}

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
  setState({ loading: true });
  const artistArray = [];
  let fullCount = 0;
  const { country, city } = getState();
  axios
    .get(
      `https://api.jamendo.com/v3.0/artists/locations/?client_id=${
        API_KEY
      }&format=jsonpretty&limit=1&haslocation=true&location_country=${
        country
      }&location_city=${city}&fullcount=true`
    )
    .then(artistCount => {
      fullCount = artistCount.data.headers.results_fullcount;
      if (fullCount < 1) {
        setState({
          userMessage: {
            message:
              "We're sorry, we could not find any artists for that city.",
            style: "danger"
          }
        });
        console.log("No results");
        return;
      }
      let offset = 0;
      if (fullCount > MAX_AMOUNT) {
        offset = Math.floor(
          Math.random() * artistCount.data.headers.results_fullcount
        );
      }
      axios
        .get(
          `https://api.jamendo.com/v3.0/artists/locations/?client_id=${
            API_KEY
          }&format=jsonpretty&limit=${
            MAX_AMOUNT
          }&haslocation=true&location_country=${country}&location_city=${
            city
          }&offset=${offset}`
        )
        .then(artists => {
          artists.data.results.forEach(artist => {
            artistArray.push(artist.id);
          });
          if (artistArray.length < MAX_AMOUNT && fullCount > MAX_AMOUNT) {
            const artistArrayFill = MAX_AMOUNT - artistArray.length;
            axios
              .get(
                `https://api.jamendo.com/v3.0/artists/locations/?client_id=${
                  API_KEY
                }&format=jsonpretty&limit=${
                  artistArrayFill
                }&haslocation=true&location_country=${country}&location_city=${
                  city
                }`
              )
              .then(artists => {
                artists.data.results.forEach(artist => {
                  artistArray.push(artist.id);
                });
              });
          }
          return artistArray;
        })
        .then(artistArray => {
          axios
            .get(
              `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${
                API_KEY
              }&format=jsonpretty&limit=${MAX_AMOUNT}&id=${artistArray.join(
                "+"
              )}`
            )
            .then(artistTracks => {
              let tracks = [];
              const { playlists, locationBar } = getState()
              const location = playlists[locationBar]
              artistTracks.data.results.forEach(tracklist => {
                const track =
                  tracklist.tracks[
                    Math.floor(Math.random() * tracklist.tracks.length)
                  ];
                tracks.push({
                  id: track.id,
                  name: track.name,
                  trackHREF: track.audio,
                  artist: tracklist.name,
                  album: track.album_name,
                  image: track.image,
                  duration: track.duration,
                  favourited: location ? isFavourited(track.id, location) : false,
                });
              });
              for (let i = tracks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                // [ tracks[i], tracks[j] ] = [ tracks[j], tracks[i] ];
                let temp = tracks[i];
                tracks[i] = tracks[j];
                tracks[j] = temp;
              }
              setState({ tracklist: tracks, userMessage: {}, playlistType: '' });
            })
            .finally(() => {
              setState({ loading: false });
            });
        });
    });
};

const getTracksById = playlistType => {
  setState({ loading: true });
  const { playlists, locationBar } = getState();
  const tracks = playlists[locationBar][playlistType];
  if (tracks) {
    axios
      .get(
        `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${
          API_KEY
        }&format=jsonpretty&limit=40&track_id=${tracks.join("+")}`
      )
      .then(res => {
        const tracks = [];
        res.data.results.forEach(track => {
          const info = track.tracks[0];
          tracks.push({
            id: info.id,
            name: info.name,
            trackHREF: info.audio,
            artist: track.name,
            album: info.album_name,
            image: info.image,
            duration: info.duration
          });
        });
        setState({ tracklist: tracks, playlistType });
      })
      .catch(() => {
        setState({
          userMessage: {
            message:
              "We're sorry, something went wrong, please try again later.",
            style: "danger"
          }
        });
      })
      .finally(() => {
        setState({ loading: false });
      });
  } else {
    setState({ tracklist: [] , loading: false});
  }
};
module.exports = {
  setLocation,
  getTracksByLocation,
  getTracksById
};
