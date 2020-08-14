import { promises as fs } from 'fs'
import path from 'path'

const htmlPath = '../../client/videojs.html'
const fullHtmlPath = path.resolve(__dirname, htmlPath)

export default (req, res) =>
  fs.readFile(fullHtmlPath, 'utf8').then((content) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(content)
    res.end()
  })
