import axios from 'axios'

import { serverUrl } from '../config'

axios.defaults.baseURL = serverUrl
axios.defaults.withCredentials = true

const extractData = (res) => res.data

export default {
  oAuth2Callback(params) {
    return axios.get('/oauth/callback', { params }).then(extractData)
  },

  getProfile() {
    return axios.get('/api/auth/profile').then(extractData)
  },

  getPlaylists() {
    return axios.get('/api/users/my-playlists').then(extractData)
  },

  getVideos(playlistId) {
    return axios
      .get(`/api/users/my-playlists/${playlistId}/videos`)
      .then(extractData)
  },

  logout() {
    return axios.get('/api/auth/logout').then(extractData)
  }
}
