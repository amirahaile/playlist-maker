'use strict';

const _ = require('lodash')
const axios = require('axios')
const querystring = require('querystring')
const winston = require('winston')

const ERR = require('../utils/constants').ERROR;
const C = require('../utils/constants').SPOTIFY;


const spotifyAuth = {
  baseTrace: '[services][spotify]',

  /**
   * Constructs queries for authorization request.
   * @returns {string} URL for Spotify authorization request
   */
  buildAuthQuery: () => {
    const responseType = 'code'; // Authorization Code Flow
    const scope = _.concat(C.SCOPES.USER_SCOPES, C.SCOPES.PLAYLIST_SCOPES).join(' ');

    const url = 'https://accounts.spotify.com/authorize?' + 
                querystring.stringify({
                  client_id: C.CLIENT_ID,
                  response_type: responseType,
                  redirect_uri: C.REDIRECT_URI,
                  scope,
                })

    return url;
  },

  /**
   * Final step for Spotify authorization. Retrieve code from Spotify callback
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
  getAuthTokens: (code, error, state) => {
    const logTrace = `${spotifyAuth.baseTrace}[verifyAuth]`

    if (error) throw new Error(`${logTrace} - `, error)
    if (!code) throw new ReferenceError(`${logTrace} - ${ERR.MISSING_PARAM}`)

    winston.info(`${logTrace} - Preparing request for Spotify /token...`)

    const { data,  config } = spotifyAuth._buildTokenRequest(code)
    return axios.post('https://accounts.spotify.com/api/token', data,  config)
      .then(res => {
        winston.info(`${logTrace} - Successfully received response from Spotify /token`)
        return spotifyAuth._buildTokenResponse(res.data)
      })
      .catch(err => { throw err })
  },

  /**
   * Builds the request for the Spotify auth token.
   * 
   * @param {string} code Authorization code returned by Spotify /authorize earlier
   * 
   * @returns {object} HTTP request config for authorization token
   * @property {object} {}.data Request body
   * @property {object} {}.config Request configs
   */
  _buildTokenRequest: (code) => {
    const authHeader = `${C.CLIENT_ID}:${C.CLIENT_SECRET}`
    const encodedAuthHeader = new Buffer(authHeader).toString('base64');
    const config = {
      'headers': {
        'Authorization': `Basic ${encodedAuthHeader}`, 
        'content-type': 'application/x-www-form-urlencoded' 
      }
    }
    const data = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: C.REDIRECT_URI,
    })

    return { data, config }
  },

  /**
   * Calculates when the token expires returns that information along with the
   * access & refresh token.
   * 
   * @param {object} tokenData Reponse data from Spotify's auth token endpoint
   * 
   * @returns {object} Token data for the frontend
   * @property {string} {}.accessToken 
   * @property {string} {}.refreshToken Token required to gain new access token 
   * @property {datestring} {}.tokenExpiration Timestamp when the token expires
   */
  _buildTokenResponse: tokenData => {
    const { access_token, expires_in, refresh_token } = tokenData
    const tokenExpiration = Date.now() + expires_in

    return { 
      accessToken: access_token, 
      refreshToken: refresh_token, 
      tokenExpiration
    }
  },
}

module.exports = spotifyAuth;