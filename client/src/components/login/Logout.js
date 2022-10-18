import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router'
import ReactLoading from 'react-loading'

const Logout = () => {
  let history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      history.push("/")
    }, 4000)
  })

  return (
    <div className="account-confirmation container-fluid">
      <div className="row top-side">
        <h1> Déconnecté ! </h1>
        <p>
          Vous allez être redirigé vers la page d'accueil.
          <br />
          Pour ne pas attendre, <Link to="/">cliquez ici.</Link>
        </p>
        <ReactLoading className='btn-animation' type={'bubbles'} color={'white'} height={0} />
      </div>
      <div className="row bottom-side" />
    </div>
  )
}

export default Logout