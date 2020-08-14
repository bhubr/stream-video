export const port = process.env.PORT || 8080
export const publicDir = process.env.PUBLIC_DIR || 'public'
export const privateDir = process.env.PUBLIC_DIR || 'private'
export const videosPath = process.env.VIDEOS_PATH || '/videos'
const regexifiedPath = videosPath.replace(/\//g, '\\/')
export const videosRegex = new RegExp(`^${regexifiedPath}\\/.*\\.mp4$`, 'i')