import userModel from '../models/user'

export const checkPlaylistAccess = async (req, res, next) => {
  const playlistId = Number(req.params.playlistId)
  const canAccess = await userModel.canAccessPlaylist(req.user.id, playlistId)
  return canAccess ? next() : res.sendStatus(403)
}

export const checkVideoAccess = async (req, res, next) => {
  const { playlistPath } = req.params
  const canAccess = await userModel.canAccessPlaylist(req.user.id, playlistPath)
  console.log('checkVideoAccess', req.params, canAccess)
  return canAccess ? next() : res.sendStatus(403)
}
