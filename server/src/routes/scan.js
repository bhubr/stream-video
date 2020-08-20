import express from 'express'
import { scanFolders } from '../services/scan'
import dbQuery from '../dbQuery'

const router = express.Router()

router.get('/', async (req, res) => {
  const [folders] = await scanFolders(req.query)
  const foldersWithoutPlaylist = folders.filter(({ playlist_id: pid }) => !pid)
  const values = foldersWithoutPlaylist.map(({ folder_name: folder }) => [
    folder,
    folder
  ])
  const insertPlaylistsSql = 'INSERT INTO playlist(title,folder) VALUES ?'
  await dbQuery(insertPlaylistsSql, [values])
  return res.json({
    playlists: values.length
  })
})

export default router
