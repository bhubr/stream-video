import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const Home = () => {
  const [playlists, setPlaylists] = useState(null)

  useEffect(() => {
    api.getPlaylists().then(setPlaylists)
  }, [])
  return (
    <div>
      <h1>Home</h1>
      {playlists &&
        playlists.map((pl) => (
          <div key={pl.id}>
            <Link to={`/playlists/${pl.id}`}>{pl.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default Home
