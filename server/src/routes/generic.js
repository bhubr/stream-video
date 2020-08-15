import express from 'express'
import genericModel from '../models/generic'
import queryFilterMiddleware from '../middlewares/queryFilter'
import queryWhereMiddleware from '../middlewares/queryWhere'

export default (table) => {
  const router = express.Router()
  const model = genericModel(table)

  router.get(
    '/',
    queryWhereMiddleware,
    queryFilterMiddleware(table),
    async (req, res) => {
      console.log('get all', table, req.query)
      const { sort, order, limit, where } = req
      const records = await model.findAll({ sort, order, limit, where })
      res.set('X-Total-Count', req.count).json(records)
    }
  )

  router.get('/:id', async (req, res) => {
    const record = await model.findOne(req.params.id)
    res.status(201).json(record)
  })

  router.post('/', async (req, res) => {
    const record = await model.create(req.body)
    res.status(201).json(record)
  })

  return router
}
