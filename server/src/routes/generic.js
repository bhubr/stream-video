import express from 'express'
import genericModel from '../models/generic'
import queryFilterMiddleware from '../middlewares/queryFilter'
import queryWhereMiddleware from '../middlewares/queryWhere'

export default (table, overrides) => {
  const router = express.Router()
  const model = genericModel(table, overrides)

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

  router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const record = await model.update(id, req.body)
    res.json(record)
  })

  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    await model.delete(id)
    res.sendStatus(204)
  })

  return router
}
