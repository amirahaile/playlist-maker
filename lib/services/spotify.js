'use strict';

const _ = require('lodash')
const axios = require('axios')
const base64 = require('base-64')
const uuidv4 = require('uuid/v4')

const C = require('../utils/constants').SPOTIFY;


const spotify = {
  /**
   * Step 1 of 2 for Spotify authorization. Make GET request to Spotify 
   * /authorize to initiate authorization process.
   * 
   * @returns {Promise<object>} result
   * @property {number} result.status 
   * @property {string} result.message 
   */
  requestAuth: () => {
    const scopes = _.concat(C.SCOPES.USER_SCOPES, 
                            C.SCOPES.PLAYLIST_SCOPES).join(' ')

    const config = {
      params: {
        client_id: C.CLIENT_ID, 
        response_type: 'code',
        redirect_uri: C.REDIRECT_URI, 
        state: uuidv4(),
        scope: scopes,
      },
    }

    return axios.get('https://accounts.spotify.com/authorize', config)
      .then(() => {
        return { status: 200, message: 'Requested Spotify authorization!' }
      })
  },

  /**
   * Step 2 of 2 for Spotify authorization. Retrieve code from Spotify callback
   * to submit with /token request in exchange for Spotify access token.
   * 
   * @param {string} code Authorization code to exchange for access token
   * @param {string} error Reason for authorization failure
   * @param {string} state Random UUID provided in /authorize request
   *
   * @returns {Promise<object>} result
   * @property {number} result.status 
   * @property {string} result.message 
   */
  verifyAuth: (code, error, state) => {
    if (error) res.send(`Uh oh! ${error}`)

    const authHeader = `${C.CLIENT_ID}:${C.CLIENT_SECRET}`
    const encodedAuthHeader = base64.encode(authHeader);
    const config = {
      headers: { 'Authorization': `Basic ${encodedAuthHeader}`},
      data: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: C.REDIRECT_URI,
      },
    }

    return axios.post('https://accounts.spotify.com/api/token', config)
      .then(res => {
        const { access_token, expires_in, refresh_token } = res.data;
        // save those in a state somewhere / hold it to the client
        return { status: 200, message: 'Successfully authorized!' }
      })
  }
}

module.exports = spotify;