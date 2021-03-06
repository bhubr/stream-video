import { escape } from 'mysql2'

const getReducer = (query) => (carry, k) => {
  console.log('reducer', carry, k, query[k])
  const value = query[k]
  if (Array.isArray(value)) {
    const str = value.map((v) => escape(v)).join(',')
    const bit = `${k} IN (${str})`
    console.log(bit)

    return `${carry} ${bit}`
  } else if (typeof value === 'string') {
    return `${carry} ${k} = ${escape(value)}`
  }
  return carry
}

const queryWhereMiddleware = (req, res, next) => {
  const { _end, _start, _order, _sort, ...rest } = req.query
  const reducer = getReducer(rest)
  const where = Object.keys(rest).reduce(reducer, '')
  req.where = where ? ` WHERE ${where}` : ''
  next()
}

export default queryWhereMiddleware
