import express from 'express'
import userModel from '../models/user'
import playlistModel from '../models/playlist'
import { checkJwt } from '../middlewares/auth'

const router = express.Router({ mergeParams: true })

router.get('/my-playlists', checkJwt, async (req, res) => {
  console.log('MY PL', req.user)
  const records = await userModel.findPlaylists(req.user.id)
  res.json(records)
})

const checkPlaylistAccess = async (req, res, next) => {
  const playlistId = Number(req.params.playlistId)
  const canAccess = await userModel.canAccessPlaylist(req.user.id, playlistId)
  console.log('canAccess playlist', req.user.id, playlistId, canAccess)
  return canAccess ? next() : res.sendStatus(403)
}

router.get(
  '/my-playlists/:playlistId/videos',
  checkJwt,
  checkPlaylistAccess,
  async (req, res) => {
    const playlistId = Number(req.params.playlistId)
    const records = await playlistModel.findVideos(playlistId)
    res.json(records)
  }
)

export default router
