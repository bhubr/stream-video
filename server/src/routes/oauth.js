import express from 'express'
import passport from 'passport'
import authService from '../services/auth'
import { getOrCreateUser } from '../middlewares/auth'

const router = express.Router()

router.get(
  '/callback',
  passport.authenticate('google', { session: false }),
  getOrCreateUser,
  async (req, res) => {
    const [jwtPayload, jwt] = await authService.generateJwt(req.user)
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: req.protocol === 'https'
    })
    const { role, ...rest } = jwtPayload
    return res.json(rest)
  }
)

export default router
