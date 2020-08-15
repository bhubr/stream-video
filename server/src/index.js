import express from 'express'
import morgan from 'morgan'
import debug from 'debug'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// BEFORE loading config
import './env'
import { port, publicDir, videosRegex, corsWhitelist } from './config'
import { jwt as jwtPassport, google as googlePassport } from './passports'
import handlers from './handlers'
import routes from './routes'
import './helpers/logHttp'

const app = express()
const log = debug('express')
const info = debug('morgan')

passport.use(googlePassport)
passport.use(jwtPassport)

app.use(morgan('dev', { stream: { write: (msg) => info(msg) } }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(publicDir))
app.use(passport.initialize())
const corsOptions = {
  credentials: true,
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  origin: function (origin, callback) {
    log('CORS origin check:', origin)
    if (!origin || corsWhitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Serve videos
app.get(videosRegex, handlers.videos)

app.use('/api', routes.api)
app.use('/oauth', routes.oauth)

app.listen(port, (err) => {
  if (err) {
    log('Error while starting up Express', err.message)
  } else {
    log('Express app listening on', port)
  }
})
