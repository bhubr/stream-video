import express from 'express'
import auth from './auth'
import oauth from './oauth'
import generic from './generic'
import folders from './folders'

const router = express.Router()

router.use('/auth', auth)
router.use('/whitelisted-users', generic('user_whitelist'))
router.use(
  '/users',
  generic('user', {
    findAll: {
      sql: `SELECT u.*,GROUP_CONCAT(up.playlist_id) AS playlist_ids FROM user u LEFT JOIN user_playlist up ON u.id = up.user_id`,
      groupBy: ' GROUP BY u.id',
      mapItem: ({ playlist_ids: playlistIds, ...rest }) => ({
        ...rest,
        playlist_ids: playlistIds
          ? playlistIds.split(',').map((i) => Number(i))
          : []
      })
    }
  })
)
router.use('/playlists', generic('playlist'))
router.use('/videos', generic('video'))
router.use('/folders', folders)

export default {
  api: router,
  oauth
}
