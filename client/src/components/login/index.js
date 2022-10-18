import React from 'react'
import api from '../../utils/api'
import bgLogo from '../../assets/images/fond_login_logo.svg'
import Logo from '../../assets/images/login_logo.png'
import LoginForm from './LoginForm'

const Index = () => {
  const sendCredentialsToServer = async (username, password) => {
    let res = await api.post(
      '/auth/login',
      {
        username: username,
        password: password
      }
    )

    if (res.status !== 200) throw new Error()

    return res
  }

  return (
    <div className="register container-fluid">
      <div className="row h-100">
        <div className="spoiler col-12 col-lg-4 col-xl-3">
          <h2> MON C<span className="edito">O</span>MPTE </h2>
          <p>
            Connectez vous pour accéder à votre compte.
          </p>
          <LoginForm sendCredentialsToServer={sendCredentialsToServer} />
        </div>
        <div className="bgd d-none d-lg-flex col-lg-8 col-xl-9">
          <img src={bgLogo} alt="#" style={{paddingBottom: "30px"}} />
          <img src={Logo} alt="#" style={{paddingTop: "30px"}} />
        </div>
      </div>
    </div>
  )
}
export default Index