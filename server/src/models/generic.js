import dbQuery from '../dbQuery'

export default (table, allOverrides = {}) => ({
  async findAll(modifiers) {
    const overrides = allOverrides.findAll || {}
    let sql = overrides.sql || `SELECT * FROM ${table}`
    const groupBy = overrides.groupBy || ''
    const where = modifiers.where || ''
    sql = `${sql} ${where} ${groupBy}`
    console.log(sql, modifiers)
    return dbQuery(sql).then((data) => {
      // if (table !== 'user') return data
      if (typeof overrides.mapItem !== 'function') return data
      return data.map(overrides.mapItem)
    })
  },

  async findOne(id) {
    const sql = `SELECT * FROM ${table} WHERE id = ?`
    const [record] = await dbQuery(sql, [id])
    return record
  },

  async create(data) {
    const sql = `INSERT INTO ${table} SET ?`
    const { insertId } = await dbQuery(sql, [data])
    return this.findOne(insertId)
  }
})
