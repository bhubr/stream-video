import dbQuery from '../dbQuery'

export default {
  async findVideos(playlistId) {
    const sql = 'SELECT * FROM video WHERE playlist_id = ?'
    console.log(sql, playlistId)
    return dbQuery(sql, [playlistId])
  }
}
