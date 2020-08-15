import express from 'express'
import passport from 'passport'
import authService from '../services/auth'

const router = express.Router()

router.get(
  '/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    const [jwtPayload, jwt] = await authService.generateJwt(req.user)
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: req.protocol === 'https'
    })
    return res.json(jwtPayload)
  }
)

export default router
