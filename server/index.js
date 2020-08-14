import express from 'express'
import debug from 'debug'
import handlers from './handlers'
import { port, publicDir } from './config'

const app = express()
const log = debug('express')

log(' config' , port, publicDir)

// Serve index.html
app.use(express.static(publicDir))

// Serve videos
app.get(/.*\.mp4$/i, handlers.video)

app.listen(port, (err) => {
  if (err) {
    log('Error while starting up Express', err.message)
  } else {
    log('Express app listening on', port)
  }
})
