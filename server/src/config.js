import path from 'path'

export const port = process.env.PORT || 8080
export const publicDir = process.env.PUBLIC_DIR || 'public'
export const privateDir = process.env.PUBLIC_DIR || 'private'
export const videosPath = process.env.VIDEOS_PATH || '/videos'
export const fullPrivateDir = path.resolve(__dirname, '../', privateDir)

const regexifiedPath = videosPath.replace(/\//g, '\\/')
export const videosRegex = new RegExp(`^${regexifiedPath}\\/.*\\.mp4$`, 'i')
export const jwtSecret = process.env.JWT_SECRET

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  GOOGLE_SCOPE,
  CLIENT_PUBLIC_ORIGIN,
  CLIENT_ADMIN_ORIGIN,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  ADMIN_USERS
} = process.env

export const googleOAuth = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: OAUTH_REDIRECT_URI,
  scope: GOOGLE_SCOPE,
  tokenURL: 'https://oauth2.googleapis.com/token'
}

export const corsWhitelist = [CLIENT_PUBLIC_ORIGIN, CLIENT_ADMIN_ORIGIN]

export const db = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
}

export const adminUsers = ADMIN_USERS.split(',')