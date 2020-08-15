import React, { useState, useEffect } from 'react'
import api from '../services/api'
import AuthContext from '../context/AuthContext'

const withAuthProvider = (Component) => {
  return (props) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
      api.getProfile()
        .then(setUser)
        .catch(console.error)
        .finally(() => setReady(true))
    }, [])

    const logout = () => api.logout().then(() => setUser(null))

    return (

      <AuthContext.Provider value={{
        user, setUser, ready, setReady, logout
      }}>
        <Component {...props} />
      </AuthContext.Provider>
    )
  }
}

export default withAuthProvider
