'use strict'

const constants = {
  ERROR: {
    MISSING_PARAM: 'The following paramter(s) were missing: ',
  },
  SPOTIFY: {
    API: {
      AUTHORIZE: 'https://accounts.spotify.com/authorize?',
      PLAYLISTS: 'https://api.spotify.com/v1/me/playlists',
      SAVED_TRACKS: 'https://api.spotify.com/v1/me/tracks',
      TOKEN: 'https://accounts.spotify.com/api/token',
    },
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: 'http://127.0.0.1:3000/auth',
    SCOPES: {
      USER_SCOPES: [ 'user-library-read', ],
      PLAYLIST_SCOPES: [
        'playlist-read-private', 'playlist-read-collaborative', 
        'playlist-modify-public', 'playlist-modify-private',
      ],
    },
    STATE_KEY: 'spotify_auth_state', 
  },
}

module.exports = constants;