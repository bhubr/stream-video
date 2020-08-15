import dbQuery from '../dbQuery'

export default (table) => ({
  async findAll() {
    const sql = `SELECT * FROM ${table}`
    return dbQuery(sql)
  },

  async findOne(id) {
    const sql = `SELECT * FROM ${table} WHERE id = ?`
    const [record] = await dbQuery(sql, [id])
    return record
  }
})
