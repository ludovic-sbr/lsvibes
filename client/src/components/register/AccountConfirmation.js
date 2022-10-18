import React from 'react'
import { Link } from "react-router-dom"

const AccountConfirmation = () => {
  return (
    <div className="account-confirmation container-fluid">
      <div className="row top-side">
        <h1> Votre inscription est maintenant validee</h1>
        <p>
          Afin de pouvoir jouer sur notre serveur de jeu, merci de <Link to="/dashboard">passer votre whitelist</Link>.
          <br />
          Une fois celle-ci passée, vous recevrez un mail afin de vous tenir informé.e de sa validation.
        </p>
      </div>
      <div className="row bottom-side" />
    </div>
  )
}

export default AccountConfirmation