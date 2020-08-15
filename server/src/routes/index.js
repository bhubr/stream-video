import express from 'express'
import auth from './auth'
import oauth from './oauth'
import generic from './generic'

const router = express.Router()

router.use('/auth', auth)
router.use('/whitelisted-users', generic('user_whitelist'))
router.use('/users', generic('user'))

export default {
  api: router,
  oauth
}
