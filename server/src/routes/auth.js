import express from 'express'
import { checkJwt } from '../middlewares/auth'

const router = express.Router()

router.get('/profile', checkJwt, (req, res) => {
  const { role, ...rest } = req.user
  res.json(rest)
})

router.get('/logout', checkJwt, (req, res) => {
  res.clearCookie('jwt')
  res.sendStatus(200)
})

export default router
