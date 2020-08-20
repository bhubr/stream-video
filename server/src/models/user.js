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
        user(google_id, email, firstname, lastname, avatar, role)
      VALUES (?, ?, ?, ?, ?, ?)`
    const { insertId } = await dbQuery(sql, data)
    return this.findOne(insertId)
  },

  async findPlaylists(userId) {
    const sql = `SELECT p.id, p.title, u.id as user_id
      FROM user u
      LEFT JOIN user_playlist up ON u.id = up.user_id
      LEFT JOIN playlist p ON up.playlist_id = p.id
      WHERE u.id = ?`
    return dbQuery(sql, [userId])
  },

  async canAccessPlaylist(userId, playlistIdOrPath) {
    let playlistId
    if (typeof playlistIdOrPath === 'string') {
      console.log('checking', playlistIdOrPath)
      const sqlPlaylist = 'SELECT id FROM playlist WHERE folder = ?'
      const [playlist] = await dbQuery(sqlPlaylist, [playlistIdOrPath])
      if (!playlist) {
        throw new Error(`No playlist with path: ${playlistIdOrPath}`)
      }
      playlistId = playlist.id
    } else {
      playlistId = playlistIdOrPath
    }
    const sql = `SELECT COUNT(*) AS count
      FROM user_playlist
      WHERE user_id = ? AND playlist_id = ?`
    const [{ count }] = await dbQuery(sql, [userId, playlistId])
    return count === 1
  }
}
