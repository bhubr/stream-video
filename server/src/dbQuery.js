import debug from 'debug'
import { createPool } from 'mysql2'
import { promisify } from 'util'
import { db as dbSettings } from './config'

const log = debug('mysql:error')

const pool = createPool(dbSettings)

const queryAsync = promisify(pool.query.bind(pool))

const logError = (sql, values) => (err) => {
  log('QUERY', sql)
  log('VALUES', values)
  log('ERROR', err)
  throw err
}

export default (...args) =>
  queryAsync(...args).catch(logError(args[0], args[1]))
