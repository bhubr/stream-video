import express from 'express'
import morgan from 'morgan'
import debug from 'debug'
import passport from 'passport'
import './env'
import { port, publicDir, videosRegex } from './config'
import { jwt, google } from './passports'
import handlers from './handlers'
import './helpers/logHttp'

const app = express()
const log = debug('express')
const info = debug('morgan')

passport.use(google)
passport.use(jwt)

// passport.serializeUser((user, done) => {
//   console.log(user)
//   done(null, user)
// })

// passport.deserializeUser((user, done) => {
//   console.log(user)
//   done(null, user)
// })

// Serve index.html
app.use(morgan('dev', { stream: { write: (msg) => info(msg) } }))
app.use(express.static(publicDir))
app.use(passport.initialize())

// Serve videos
app.get(videosRegex, handlers.videos)

app.get(
  '/oauth/google',
  passport.authenticate('google', { scope: ['profile'] })
)

app.get(
  '/oauth/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { id, firstname, lastname, avatar } = req.user
    res.json({ id, firstname, lastname, avatar })
  }
)

app.listen(port, (err) => {
  if (err) {
    log('Error while starting up Express', err.message)
  } else {
    log('Express app listening on', port)
  }
})
