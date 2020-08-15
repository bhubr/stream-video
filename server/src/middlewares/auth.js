import passport from 'passport'
import authService from '../services/auth'

export const checkJwt = passport.authenticate('jwt', { session: false })

export const getOrCreateUser = async (req, res, next) => {
  try {
    req.user = await authService.registerUser(req.user)
  } catch (err) {
    return res.status(401).json({
      error: err.message
    })
  }
  next()
}
