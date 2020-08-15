import express from 'express'
import auth from './auth'
import oauth from './oauth'

const router = express.Router()

router.use('/auth', auth)

export default {
  api: router,
  oauth
}
