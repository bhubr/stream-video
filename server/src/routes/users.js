import express from 'express'
import userModel from '../models/user'
import playlistModel from '../models/playlist'
import { checkJwt } from '../middlewares/auth'
import { checkPlaylistAccess } from '../middlewares/access'

const router = express.Router({ mergeParams: true })

router.get('/my-playlists', checkJwt, async (req, res) => {
  const records = await userModel.findPlaylists(req.user.id)
  res.json(records)
})

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
