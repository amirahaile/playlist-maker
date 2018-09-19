'use strict';

const axios = require('axios')
const querystring = require('querystring')

const C = require('./utils/constants').SPOTIFY;


const dashboard = {
  getData: () => {
    const config = {
      'headers': {
        'Authorization': `Basic ${encodedAuthHeader}`, 
        'content-type': 'application/x-www-form-urlencoded' 
      }
    }
    const getPlaylistsRequest = _buildGetPlaylistsRequest(config)
    const savedTracksRequest = _buildSavedTracksRequest()

    let playlists;
    let savedTracks;

    Promise.all([ getPlaylistsRequest, savedTracksRequest ])
      .then(responses => {
        playlistsResponse = response[0]
        playlists = playlistsResponse.items

        savedTracks = response[1]
      })
      .then(() => {
        const playlistsTracksRequests = _.map(playlists, playlist => {
          const url = playlist.tracks.href
          return axios.get(url, config)
        })

        return playlistsTracksRequests
      })
      .then(tracks => {
        
      })
      .catch(err => {

      })
  },
  
  _buildGetPlaylistsRequest: (config) => {
    const queries = querystring.stringify({
      limit: 50, // max
    })
    const url = C.API.PLAYLISTS + queries
    return axios.get(url, config)
  },

  _buildSavedTracksRequest: (config) => {
    const queries = querystring.stringify({
      limit: 50, // max
    })
    const url = C.API.SAVED_TRACKS + queries
    return axios.get(url, config)
  },
}

module.exports = dashboard;