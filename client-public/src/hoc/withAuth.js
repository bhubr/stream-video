import React, { useContext} from 'react'
import AuthContext from '../context/AuthContext'

const withAuth = (Component) => {
  return (props) => {
    const {user,setUser, logout} = useContext(AuthContext)
    return (
      <Component {...props} user={user} setUser={setUser} logout={logout} />
    )
  }
}

export default withAuth
