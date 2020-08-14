const fs = require('fs').promises
const path = require('path')
const htmlPath = '../../client/videojs.html'
const fullHtmlPath = path.resolve(__dirname, htmlPath)

module.exports = (req, res) =>
  fs.readFile(fullHtmlPath, 'utf8').then((content) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(content)
    res.end()
  })
