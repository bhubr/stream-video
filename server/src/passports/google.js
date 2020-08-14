import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { googleOAuth as googleOAuthConfig } from '../config'

export default new GoogleStrategy(
  googleOAuthConfig,
  (accessToken, refreshToken, profile, done) => {
    const {
      id,
      name: { givenName: firstname, familyName: lastname },
      _json: { picture: avatar }
    } = profile
    const user = {
      id,
      firstname,
      lastname,
      avatar,
      accessToken
    }
    done(null, user)
  }
)
