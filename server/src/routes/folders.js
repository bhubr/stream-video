import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import { fullPrivateDir, videosPath } from '../config'

const router = express.Router()

const filterFile = (filename) => !filename.includes('.')
const mapFile = (filename, i) => ({
  id: i + 1,
  folder_name: filename
})

const fullVideosPath = path.join(fullPrivateDir, videosPath)

router.get('/', async (req, res) => {
  const files = await fs.readdir(fullVideosPath)
  const folders = files.filter(filterFile).map(mapFile)
  res.set('X-Total-Count', folders.length).json(folders)
})

export default router
