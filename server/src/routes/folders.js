import express from 'express'
import { scanFolders } from '../services/scan'

const router = express.Router()

router.get('/', async (req, res) => {
  const [folders, count] = await scanFolders(req.query)
  res.set('X-Total-Count', count).json(folders)
})

export default router
