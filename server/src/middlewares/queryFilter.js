import dbQuery from '../dbQuery'

const queryFilterMiddleware = (table) => async (req, res, next) => {
  const { _end, _start, _order, _sort } = req.query
  if (isNaN(_end) && isNaN(_start)) {
    req.limit = ''
    return next()
  }
  if (req._order && !/^\w+$/.test(req._order)) {
    return res.status(400).json('incorrect field name format')
  }
  if (req._sort && !['ASC', 'DESC'].includes(req._sort.toUpperCase())) {
    return res.status(400).json('incorrect sorting order')
  }
  req.sort = _sort
  req.order = _order
  const num = _end - _start
  req.limit = `LIMIT ${num} OFFSET ${_start}`
  const sql = `SELECT COUNT(*) AS count FROM ${table}`
  try {
    const [{ count }] = await dbQuery(sql)
    req.count = count
    next()
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}

export default queryFilterMiddleware
