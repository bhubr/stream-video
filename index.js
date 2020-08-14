import http from 'http'
import handlers from './handlers'

const routes = {
  '.*.mp4$': handlers.video,
  '.*': handlers.index
}

const getHandler = (url) => {
  const key = Object.keys(routes).find((re) => new RegExp(re).test(url))
  console.log(url, key)
  if (key) return routes[key]
  return handlers.notFound
}

http
  .createServer(function (req, res) {
    const handler = getHandler(req.url)
    handler(req, res)
    // console.log(handler.toString())
    // res.writeHead(200)
    // res.end()
  })
  .listen(8080)
