const serveIndex = require('./serveIndex')
const serveVideo = require('./serveVideo')
const notFound = require('./notFound')

module.exports = {
  index: serveIndex,
  video: serveVideo,
  notFound
}
