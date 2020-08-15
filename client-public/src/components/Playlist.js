import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import api from '../services/api'
import { serverUrl } from '../config'

const getVideoJsOptions = (video) => ({
  autoplay: false,
  controls: true,
  sources: [
    {
      src: `${serverUrl}/videos/${video.folder}/${video.file}`,
      type: 'video/mp4'
    }
  ]
})

const Playlist = () => {
  const [videos, setVideos] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)
  const { playlistId } = useParams()

  useEffect(() => {
    api.getVideos(playlistId).then(setVideos)
  }, [])
  return (
    <div>
      <h1>Home</h1>
      {videos &&
        videos.map((vid) => (
          <div key={vid.id}>
            {vid.title}{' '}
            <button type="button" onClick={() => setPlayingVideo(vid)}>
              Show
            </button>
          </div>
        ))}
      {playingVideo && <VideoPlayer {...getVideoJsOptions(playingVideo)} />}
    </div>
  )
}

export default Playlist
