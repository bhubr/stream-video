import { Strategy as JwtStrategy } from 'passport-jwt'
import { jwtSecret as secretOrKey } from '../config'

const opts = {
  jwtFromRequest: ({ cookies }) =>
    cookies && cookies.jwt ? cookies.jwt : null,
  secretOrKey
}

export default new JwtStrategy(opts, ({ iat, ...user }, done) =>
  done(null, user)
)
