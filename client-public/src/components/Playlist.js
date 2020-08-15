import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

const Playlist = () => {
  const [videos, setVideos] = useState(null)
  const { playlistId } = useParams()

  useEffect(() => {
    api.getVideos(playlistId).then(setVideos)
  }, [])
  return (
    <div>
      <h1>Home</h1>
      {videos && videos.map((vid) => <div key={vid.id}>{vid.title}</div>)}
    </div>
  )
}

export default Playlist
