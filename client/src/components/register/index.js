import React from 'react'

import RegisterForm from './RegisterForm'

import bgLogo from '../../assets/images/fond_login_logo.svg';
import Logo from '../../assets/images/login_logo.png';

import api from '../../utils/api'

const Index = () => {
  const sendCredentialsToServer = async (username, email, password, newsletter) => {
    let res = await api.post(
      '/auth/register',
      {
        username: username,
        email: email,
        password: password,
        newsletter: newsletter
      }
    )

    if (res.status !== 201) throw new Error()
  }

  return (
    <div className="register container-fluid">
      <div className="row h-100">
        <div className="bgd d-none d-lg-flex col-lg-8 col-xl-9">
          <img src={bgLogo} alt="#" style={{paddingBottom: "30px"}} />
          <img src={Logo} alt="#" style={{paddingTop: "30px"}} />
        </div>
        <div className="spoiler col-12 col-lg-4 col-xl-3">
          <h2> INSCRIPTI<span className="edito">O</span>N </h2>
          <p>
            Créez votre compte pour avoir accés au site et au jeu.
          </p>
          <RegisterForm sendCredentialsToServer={sendCredentialsToServer} />
        </div>
      </div>
    </div>
  )
}

export default Index