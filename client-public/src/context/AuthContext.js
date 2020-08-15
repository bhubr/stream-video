import { createContext } from 'react'

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  ready: false,
  setReady: () => {},
  logout: () => {},
})

export default AuthContext
