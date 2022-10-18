import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  let user = useSelector((state) => state.user.value)

  return (
    <ul className="navbar-nav d-flex flex-row">
      <li className="nav-item">
        <Link className="nav-link" to="/">Règlement</Link>
      </li>
      {
        user ?
          <li className="nav-item">
            <Link className="nav-link" to="/">Demandes</Link>
          </li>
          : null
      }
      <li className="nav-item">
        <Link className="nav-link" to="/">Wiki</Link>
      </li>
      {
        user && user.adminLvl > 0 ?
          <li className="nav-item">
            <Link className="nav-link" to="/">Administration</Link>
          </li>
          : null
      }
    </ul>
  )
}

export default Navbar