import express from 'express'
import { map as mapAsync } from 'bluebird'
import { scanFolders, scanFiles } from '../services/scan'
import playlistModel from '../models/playlist'
import dbQuery from '../dbQuery'

const router = express.Router()

const getInsertPlaylistsPromise = async (values) => {
  const insertPlaylistsSql = 'INSERT INTO playlist(title,folder) VALUES ?'

  if (values.length > 0) {
    dbQuery(insertPlaylistsSql, [values])
  }
  return values.length
}

const getInsertVideosPromise = async (folder) => {
  const playlist = await playlistModel.findOne(folder, 'folder')
  const insertVideosSql = 'INSERT INTO video(playlist_id, title, file) VALUES ?'

  const [files] = await scanFiles(folder)
  const values = files
    .filter(({ video_id: vid }) => !vid)
    .map(({ file_name: file }) => [playlist.id, file, file])

  console.log('getInsertVideoPromise', folder, playlist, files, values)
  if (values.length > 0) {
    dbQuery(insertVideosSql, [values])
  }
  return values.length
}

router.get('/', async (req, res) => {
  const [folders] = await scanFolders(req.query)
  const foldersWithoutPlaylist = folders.filter(({ playlist_id: pid }) => !pid)
  const values = foldersWithoutPlaylist.map(({ folder_name: folder }) => [
    folder,
    folder
  ])
  const playlistsCount = await getInsertPlaylistsPromise(values)
  const videosCounts = await mapAsync(folders, (f) =>
    getInsertVideosPromise(f.folder_name)
  )
  const videosCount = videosCounts.reduce((s, i) => s + i, 0)

  return res.json({
    playlists: playlistsCount,
    videos: videosCount
  })
})

export default router
