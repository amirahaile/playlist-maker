'use strict'

const constants = {
  SPOTIFY: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: 'http://localhost:3000/auth',
    SCOPES: {
      USER_SCOPES: ['user-library-read'],
      PLAYLIST_SCOPES: ['playlist-read-private', 
      'playlist-read-collaborative', 'playlist-modify-public', 
      'playlist-modify-private'],
    }
  },
}

module.exports = constants;