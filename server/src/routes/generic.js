import express from 'express'
import genericModel from '../models/generic'
import queryFilterMiddleware from '../middlewares/queryFilter'

export default (table) => {
  const router = express.Router()
  const model = genericModel(table)

  router.get('/', queryFilterMiddleware(table), async (req, res) => {
    console.log('get all', table)
    const records = await model.findAll()
    res.set('X-Total-Count', req.count).json(records)
  })

  console.log('router', table, router)

  return router
}
