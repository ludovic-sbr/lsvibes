import React from 'react'
import { Link } from 'react-router-dom'

const AuthBtn = ({ user }) => {

  if (user) {
    return (
      <div className="auth-btn">
        <span> Bonjour,   <Link to="/dashboard"> { user.username }</Link>. </span>
      </div>
    )
  } else {
    return (
      <div className="auth-btn">
        <Link className="nav-link" to="/register"> S'inscrire </Link>
        <Link to="/login">
          <button className="btn-login ms-2"> Connexion </button>
        </Link>
      </div>
    )
  }
}

export default AuthBtn