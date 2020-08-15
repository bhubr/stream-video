import express from 'express'
import auth from './auth'
import oauth from './oauth'
import generic from './generic'
import folders from './folders'

const router = express.Router()

router.use('/auth', auth)
router.use('/whitelisted-users', generic('user_whitelist'))
router.use('/users', generic('user'))
router.use('/playlists', generic('playlist'))
router.use('/videos', generic('video'))
router.use('/folders', folders)

export default {
  api: router,
  oauth
}
