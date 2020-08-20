import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const withAuth = (Component) => {
  const CompWithAuth = (props) => {
    const { user, setUser, logout } = useContext(AuthContext)
    return (
      <Component
        {...props}
        user={user}
        setUser={setUser}
        logout={logout}
        isAuthenticated={!!user}
      />
    )
  }
  CompWithAuth.displayName = 'withAuth'
  return CompWithAuth
}

export default withAuth
