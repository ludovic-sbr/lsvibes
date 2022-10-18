import React, { useEffect, useRef, useState } from 'react'

import { AiOutlineUser } from 'react-icons/ai'
import { ImKey2 } from 'react-icons/im'
import ErrorIcon from "../../assets/images/error-icon.svg"
import ReactLoading from 'react-loading'

import { useDispatch } from 'react-redux'
import { fetchUser } from '../../reducers/user'
import { useHistory } from 'react-router-dom'

const LoginForm = ({ sendCredentialsToServer }) => {
  let history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    invalidAccount: false
  })
  const [queryStatus, setQueryStatus] = useState({
    processing: false
  })

  const dispatch = useDispatch()

  const loginFormRef = useRef()

  useEffect(() => {
    loginFormRef.current.onsubmit = () => {
      setErrors({
        username: !new RegExp(/^(?=.{0,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).test(username),
        password: !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password),
        invalidAccount: false
      })
    }
  }, [errors, username, password, loginFormRef])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setQueryStatus({
      processing: true
    })

    try {
      if (errors.username || errors.password) throw new Error("Invalid credentials")

      let res = await sendCredentialsToServer(username, password)

      dispatch(fetchUser(res.data.token))

      setUsername("")
      setPassword("")

      setQueryStatus({
        processing: false
      })

      history.push("/login-confirmation")

    } catch (error) {
      setQueryStatus({
        processing: false
      })

      if (error.message !== "Invalid credentials") {
        setErrors({
          ...errors,
          invalidAccount: true
        })
      }
    }
  }

  return (
    <form className="loginForm mt-4" onSubmit={handleSubmit} ref={loginFormRef}>
      <div className={ errors.username || errors.password || errors.invalidAccount ? "chart error" : "chart" }>
        <AiOutlineUser style={{ color: 'white', marginLeft: "15px" }}/>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required="required"
          placeholder="Nom d'utilisateur"
          autoComplete="off"
        />
        { errors.username || errors.existing ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
      </div>
      { errors.username || errors.password || errors.invalidAccount ? <div className="error-msg"> Erreur: identifiant ou mot de passe incorrect. </div> : null}

      <div className={ errors.username || errors.password || errors.invalidAccount ? "chart error" : "chart" }>
        <ImKey2 style={{ color: 'white', marginLeft: "15px" }}/>
        <input
          type="password" name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required="required"
          placeholder="Mot de passe"
          autoComplete="off"
        />
        { errors.username || errors.password || errors.invalidAccount ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
      </div>

      {
        queryStatus.processing ?
          <button className="btn btn-primary submit" type="submit" disabled="disabled"> <ReactLoading className='btn-animation' type={'bubbles'} color={'white'} /> </button>
          : <button className="btn btn-primary submit" type="submit"> Se connecter </button>
      }
    </form>
  )
}

export default LoginForm