import express from 'express'
import { checkJwt } from '../middlewares/auth'

const router = express.Router()

router.get('/profile', checkJwt, (req, res) => res.json(req.user))

router.get('/logout', checkJwt, (req, res) => {
  res.clearCookie('jwt')
  res.sendStatus(200)
})

export default router
