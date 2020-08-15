import React from 'react'
import { Link } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const Navbar = ({ user, logout }) => (
  <nav className="Navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      {
        user && (
          <>
            <li>
              <button type="button" onClick={logout}>Logout</button>
            </li>
            <li>
              <img referrerpolicy="no-referrer" alt={user.firstname} src={user.avatar} />
            </li>
          </>
        )
      }
    </ul>
  </nav>
)

export default withAuth(Navbar)
