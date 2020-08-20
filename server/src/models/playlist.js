import dbQuery from '../dbQuery'

export default {
  async findVideos(playlistId) {
    const sql = `
    SELECT v.*, p.folder
    FROM video v
    JOIN playlist p ON v.playlist_id = p.id
    WHERE playlist_id = ?`
    console.log(sql, playlistId)
    return dbQuery(sql, [playlistId])
  },

  async findOne(idOrFolder, field = 'id') {
    if (!['id', 'folder'].includes(field)) {
      throw new Error(`Invalid field: $field`)
    }
    const sql = `SELECT * FROM playlist WHERE ${field} = ?`
    const [playlist] = await dbQuery(sql, [idOrFolder])
    if (!playlist) return undefined

    return playlist
  }
}
