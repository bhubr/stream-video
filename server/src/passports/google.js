import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { googleOAuth as googleOAuthConfig } from '../config'

export default new GoogleStrategy(
  googleOAuthConfig,
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    if (!profile) return done(new Error('No profile'))
    const {
      id: googleId,
      name: { givenName: firstname, familyName: lastname },
      _json: { email, picture: avatar }
    } = profile
    const user = {
      googleId,
      email,
      firstname,
      lastname,
      avatar,
      accessToken
    }
    done(null, user)
  }
)
