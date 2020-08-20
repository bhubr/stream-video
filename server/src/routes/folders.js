import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import { fullPrivateDir, videosPath } from '../config'
import dbQuery from '../dbQuery'

const router = express.Router()

const filterFile = (filename) => !filename.includes('.')
const mapFolders = (folders, existingPlaylists) =>
  folders.map((folderName, i) => {
    const playlist = existingPlaylists.find((pl) => pl.folder === folderName)
    return {
      id: i + 1,
      folder_name: folderName,
      playlist_id: playlist && playlist.id
    }
  })

const fullVideosPath = path.join(fullPrivateDir, videosPath)

router.get('/', async (req, res) => {
  const files = await fs.readdir(fullVideosPath)
  const folders = files.filter(filterFile)
  const filterFolders = folders.length > 0 ? 'folder IN (?)' : '0'
  const sqlPlaylistsFolders = `SELECT * FROM playlist WHERE ${filterFolders}`
  const existingPlaylists = await dbQuery(sqlPlaylistsFolders, [folders])
  const mappedFolders = mapFolders(folders, existingPlaylists)
  res.set('X-Total-Count', folders.length).json(mappedFolders)
})

export default router
