import path from 'path'
import dotenv from 'dotenv'
import debug from 'debug'

const log = debug('env')
const env = process.env.NODE_ENV || 'development'
const envFile = env === 'test' ? '.env.test' : '.env'
const envFilePath = path.resolve(__dirname, '..', envFile)

console.log(envFilePath)
try {
  dotenv.config({ path: envFilePath })
} catch (err) {
  log('No env file:', envFilePath)
}
