import dbQuery from '../dbQuery'

export default {
  async isWhitelisted(email) {
    const sql = 'SELECT * FROM user_whitelist WHERE email = ?'
    const records = await dbQuery(sql, [email])
    return records.length === 1
  },

  async findOne(idOrEmail, field = 'id') {
    if (!['id', 'email'].includes(field)) {
      throw new Error(`Invalid field: $field`)
    }
    const sql = `SELECT * FROM user WHERE ${field} = ?`
    const [user] = await dbQuery(sql, [idOrEmail])
    if (!user) return undefined

    const { google_id: googleId, ...rest } = user
    return { ...rest, googleId }
  },

  async create(data) {
    const sql = `INSERT INTO
        user(google_id, email, firstname, lastname, avatar)
      VALUES (?, ?, ?, ?, ?)`
    const { insertId } = await dbQuery(sql, data)
    return this.findOne(insertId)
  }
}
