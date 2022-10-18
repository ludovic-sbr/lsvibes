import React from 'react'
import { Link } from 'react-router-dom'

import LogoImg from "../../assets/images/logo.png"

const Logo = () => {
  return (
    <Link className="navbar-brand logo" to="/">
      <img src={LogoImg} alt="logo" />
    </Link>
  )
}

export default Logo