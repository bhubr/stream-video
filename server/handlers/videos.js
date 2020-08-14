import mimeTypes from 'mime-types'
import fs, { promises as fsp } from 'fs'
import path from 'path'
import notFound from './notFound'
import { privateDir } from '../config'

const fullVideosDir = path.resolve(__dirname, '../', privateDir)
console.log(fullVideosDir)
export default async (req, res) => {
  const range = req.headers.range
  const filename = req.url.substr(1)
  const contentType = mimeTypes.lookup(filename)

  const fullFilePath = path.join(fullVideosDir, filename)
  console.log(fullFilePath)

  let stats
  try {
    stats = await fsp.stat(fullFilePath)
  } catch (err) {
    return notFound(req, res)
  }

  const { range: rangeHeader } = req.headers
  if (!rangeHeader) {
    const fileContent = await fsp.readFile(fullFilePath)
    console.log('hei')
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
  console.log(ini, end, chunkSize)
  if (parseInt(ini) >= total || parseInt(end) >= total) {
    // Indicate the acceptable range.
    res.status(416)
    res.set('Content-Range', 'bytes */' + total) // File size.
    // Return the 416 'Requested Range Not Satisfiable'.
    res.end()
  }
  res.writeHead(206, {
    Connection: 'keep-alive',
    'Content-Range': 'bytes ' + ini + '-' + end + '/' + total,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': contentType
  })
  fs.createReadStream(fullFilePath, { start: ini, end: end }).pipe(res)
}
