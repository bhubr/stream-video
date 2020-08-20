import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withAuth from '../hoc/withAuth'
import { userPropTypes } from '../prop-types'

const propTypes = {
  user: userPropTypes,
  logout: PropTypes.func
}

const Navbar = ({ user, logout }) => (
  <nav className="Navbar">
    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      {user && (
        <>
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
          <li>
            <img
              referrerPolicy="no-referrer"
              alt={user.firstname}
              src={user.avatar}
              style={{ maxWidth: 48, borderRadius: '50%' }}
            />
          </li>
        </>
      )}
    </ul>
  </nav>
)

Navbar.propTypes = propTypes

export default withAuth(Navbar)
