import http from 'http'
import https from 'https'
import debug from 'debug'

const loggers = {
  http: debug('http:insecure'),
  https: debug('http:secure')
}

function requestLogger(httpModule, protocol) {
  const log = loggers[protocol]
  var original = httpModule.request
  httpModule.request = (options, callback) => {
    log(`${options.method} ${protocol}://${options.host}${options.path}`)
    return original(options, callback)
  }
}

requestLogger(http, 'http')
requestLogger(https, 'https')
