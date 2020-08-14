import express from 'express'
import morgan from 'morgan'
import debug from 'debug'
import passport from 'passport'
import cors from 'cors'

// BEFORE loading config
import './env'
import { port, publicDir, videosRegex, corsWhitelist } from './config'
import { jwt as jwtPassport, google as googlePassport } from './passports'
import handlers from './handlers'
import authService from './services/auth'
import './helpers/logHttp'

const app = express()
const log = debug('express')
const info = debug('morgan')

passport.use(googlePassport)
passport.use(jwtPassport)

app.use(morgan('dev', { stream: { write: (msg) => info(msg) } }))
app.use(express.static(publicDir))
app.use(passport.initialize())
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Serve videos
app.get(videosRegex, handlers.videos)

app.get(
  '/oauth/google',
  passport.authenticate('google', { scope: ['profile'] })
)

app.get(
  '/oauth/callback',
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

app.listen(port, (err) => {
  if (err) {
    log('Error while starting up Express', err.message)
  } else {
    log('Express app listening on', port)
  }
})
