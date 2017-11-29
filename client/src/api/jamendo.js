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
          },
          loading: false,
          tracklist: []
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
        .then(results => {
          let artists = {};
          results.data.results.forEach(artist => {
            artists[artist.id] = artist.website
          });
          if (artists.length < MAX_AMOUNT && fullCount > MAX_AMOUNT) {
            const artistArrayFill = MAX_AMOUNT - artists.length;
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
              .then(results => {
                results.data.results.forEach(artist => {
                  artists[artist.id] = artist.website
                });
              });
          }
          return artists;
        })
        .then(artists => {
          const artistIds = [];
          Object.keys(artists).forEach(artist => {
            artistIds.push(artist)
          })
          axios
            .get(
              `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${
                API_KEY
              }&format=jsonpretty&limit=${MAX_AMOUNT}&id=${artistIds.join(
                "+"
              )}`
            )
            .then(artistTracks => {
              let tracks = [];
              const { playlists, locationBar } = getState()
              const location = playlists[locationBar]
              artistTracks.data.results.forEach( tracklist => {
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
                  website: artists[tracklist.id],
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
              setState({ tracklist: tracks, userMessage: {}, playlistType: ''});
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
        const tracklist = [];
        tracks.forEach( track => {
          res.data.results.forEach( resTrack => {
            const info = resTrack.tracks[0];
            if (info.id === track) {
              tracklist.push({
                id: info.id,
                name: info.name,
                trackHREF: info.audio,
                artist: resTrack.name,
                album: info.album_name,
                image: info.image,
                duration: info.duration
              });
            }
          });
        });
        setState({ tracklist: tracklist, playlistType });
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
