import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Playlist from './components/Playlist'
import withAuthProvider from './hoc/withAuthProvider'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/playlists/:playlistId" component={Playlist} />
      </Switch>
    </div>
  )
}

export default withAuthProvider(App)
