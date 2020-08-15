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
  }
}
