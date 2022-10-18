import React from 'react'

import Logo from './Logo'
import Navbar from './Navbar'
import AuthBtn from './AuthBtn'
import { useSelector } from 'react-redux'

const Index = () => {
  const user = useSelector((state) => state.user.value)

  return (
    <div className="header container-fluid">
      <div className="container h-100 d-flex align-items-center justify-content-between">
        <Logo />
        <Navbar user={user} />
        <AuthBtn user={user} />
      </div>
    </div>
  )
}

export default Index