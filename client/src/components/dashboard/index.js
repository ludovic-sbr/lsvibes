import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/user'

import Informations from './Informations'
import Password from './Password'
import Whitelist from './Whitelist'

import api from '../../utils/api'

import { useHistory } from 'react-router-dom'

import { RiArrowRightSLine, RiUserFollowLine } from 'react-icons/ri'
import { TiBusinessCard } from 'react-icons/ti'
import { CgPassword } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'

const Index = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const [content, setContent] = useState("")
  let history = useHistory()

  const removeSession = () => {
    history.push("/logout")
    dispatch(logout())
  }

  const sendCredentialsToServer = async (currentPassword, password) => {
    let res = await api.post(
      '/password/change',
      {
        uid: user.uid,
        currentPassword: currentPassword,
        password: password,
      }
    )

    if (res.status !== 200) throw new Error()

    alert("Mot de passe changé !")
  }

  let contentSwitch =
    content === "password" ?
      <Password sendCredentialsToServer={sendCredentialsToServer} />
    : content === "whitelist" ?
      <Whitelist />
    : <Informations user={user} />

  return (
    <div className="dashboard d-flex align-items-center">
      <div className="container">
        <div className="row w-100">
          <div className="panel col-10">
            <div className="row panel-header mx-auto">
              <div className="col-lg-4">
                <div className="user d-none d-lg-flex">
                  Dashboard de <span style={{fontFamily: "EudoxusSans-Regular"}}>{ user.username }</span>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="title">
                  {
                    content === "password" ? "Mot de passe"
                      : content === "whitelist" ? "Whitelist"
                      : "Mes informations"
                  }
                </div>
              </div>
            </div>
            <div className="row section mx-auto p-0">
              <div className="col-lg-4">
                <div className="menu">
                  <button
                    className={content === "" ? "panel-btn active" : "panel-btn"}
                    onClick={() => setContent("")}
                  >
                    <TiBusinessCard />
                    <span> Mes informations </span>
                    <RiArrowRightSLine />
                  </button>
                  <button
                    className={content === "whitelist" ? "panel-btn active" : "panel-btn"}
                    onClick={() => setContent("whitelist")}
                  >
                    <RiUserFollowLine />
                    <span> Effectuer sa whitelist </span>
                    <RiArrowRightSLine />
                  </button>
                  <button
                    className={content === "password" ? "panel-btn active" : "panel-btn"}
                    onClick={() => setContent("password")}
                  >
                    <CgPassword />
                    <span> Changer de mot de passe </span>
                    <RiArrowRightSLine />
                  </button>
                  <button
                    className="panel-btn"
                    onClick={removeSession}
                  >
                    <BiLogOutCircle />
                    <span> Déconnexion </span>
                    <RiArrowRightSLine />
                  </button>
                </div>
              </div>
              <div className="content col-lg-8">
                { contentSwitch }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index