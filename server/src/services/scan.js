import { promises as fs } from 'fs'
import path from 'path'
import { fullPrivateDir, videosPath } from '../config'
import dbQuery from '../dbQuery'

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

export const scanFolders = async (query = {}) => {
  const { _start, _end } = query
  const files = await fs.readdir(fullVideosPath)
  const allFolders = files.filter(filterFile)
  const start = _start ? Number(_start) : 0
  const end = _end ? Number(_end) : allFolders.length
  const folders = allFolders.slice(start, end)
  const filterFolders = folders.length > 0 ? 'folder IN (?)' : '0'
  const sqlPlaylistsFolders = `SELECT * FROM playlist WHERE ${filterFolders}`
  const existingPlaylists = await dbQuery(sqlPlaylistsFolders, [folders])
  const data = mapFolders(folders, existingPlaylists)
  return [data, allFolders.length]
}
