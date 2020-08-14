import express from 'express'
import debug from 'debug'
import handlers from './handlers'
import { port, publicDir, videosRegex } from './config'

const app = express()
const log = debug('express')

// Serve index.html
app.use(express.static(publicDir))

// Serve videos
app.get(videosRegex, handlers.videos)

app.listen(port, (err) => {
  if (err) {
    log('Error while starting up Express', err.message)
  } else {
    log('Express app listening on', port)
  }
})
