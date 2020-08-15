import dbQuery from '../dbQuery'

export default (table) => ({
  async findAll(modifiers) {
    const where = modifiers.where || ''
    const sql = `SELECT * FROM ${table} ${where}`
    console.log(sql, modifiers)
    return dbQuery(sql)
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
