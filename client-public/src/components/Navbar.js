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
    <ul>
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
              referrerpolicy="no-referrer"
              alt={user.firstname}
              src={user.avatar}
            />
          </li>
        </>
      )}
    </ul>
  </nav>
)

Navbar.propTypes = propTypes

export default withAuth(Navbar)
