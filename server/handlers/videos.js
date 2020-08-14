// https://stackoverflow.com/q/36715403/
import mimeTypes from 'mime-types'
import fs, { promises as fsp } from 'fs'
import path from 'path'
import debug from 'debug'
import notFound from './notFound'
import { privateDir } from '../config'

const log = debug('videos')

const fullVideosDir = path.resolve(__dirname, '../', privateDir)

export default async (req, res) => {
  const range = req.headers.range
  const filename = req.url.substr(1)
  const contentType = mimeTypes.lookup(filename)

  const fullFilePath = path.join(fullVideosDir, filename)
  log(fullFilePath)

  let stats
  try {
    stats = await fsp.stat(fullFilePath)
  } catch (err) {
    return notFound(req, res)
  }

  const { range: rangeHeader } = req.headers
  if (!rangeHeader) {
    const fileContent = await fsp.readFile(fullFilePath)
    res.status(200)
    res.set('Connection', 'keep-alive')
    res.set('Content-Type', contentType)
    res.set('Content-Length', fileContent.length)
    res.set('Accept-Ranges', 'bytes')
    return res.end(fileContent)
  }
  const total = stats.size
  const split = range.split(/[-=]/)
  const ini = +split[1]
  const end = split[2] ? +split[2] : total - 1
  const chunkSize = end - ini + 1
  log(`ini: ${ini}, end: ${end}, chunkSize: ${chunkSize}`)
  if (parseInt(ini) >= total || parseInt(end) >= total) {
    // Indicate the acceptable range.
    res.status(416)
    res.set('Content-Range', 'bytes */' + total) // File size.
    // Return the 416 'Requested Range Not Satisfiable'.
    res.end()
  }
  res.status(206)
  res.set('Connection', 'keep-alive')
  res.set('Content-Range', 'bytes ' + ini + '-' + end + '/' + total)
  res.set('Accept-Ranges', 'bytes')
  res.set('Content-Length', chunkSize)
  res.set('Content-Type', contentType)
  fs.createReadStream(fullFilePath, { start: ini, end: end }).pipe(res)
}
