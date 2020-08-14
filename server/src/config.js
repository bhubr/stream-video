export const port = process.env.PORT || 8080
export const publicDir = process.env.PUBLIC_DIR || 'public'
export const privateDir = process.env.PUBLIC_DIR || 'private'
export const videosPath = process.env.VIDEOS_PATH || '/videos'
const regexifiedPath = videosPath.replace(/\//g, '\\/')
export const videosRegex = new RegExp(`^${regexifiedPath}\\/.*\\.mp4$`, 'i')
export const jwtSecret = process.env.JWT_SECRET

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  OAUTH_REDIRECT_URI
} = process.env

export const googleOAuth = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: OAUTH_REDIRECT_URI,
  tokenURL: 'https://oauth2.googleapis.com/token'
}

export const corsWhitelist = [
  process.env.CLIENT_PUBLIC_ORIGIN,
  process.env.CLIENT_ADMIN_ORIGIN
]
