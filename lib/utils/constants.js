'use strict'

const constants = {
  ERROR: {
    MISSING_PARAM: 'The following paramter(s) were missing: ',
  },
  SPOTIFY: {
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