import axios from 'axios'

import { serverUrl } from '../config'

axios.defaults.baseURL = serverUrl

export default {
  oAuth2Callback(params) {
    return axios.get('/oauth/callback', { params }).then((res) => res.data)
  }
}
