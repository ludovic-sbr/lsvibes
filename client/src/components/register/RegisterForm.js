import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom"
import ReactLoading from 'react-loading'

import { AiOutlineUser } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import { ImKey2 } from 'react-icons/im'
import ErrorIcon from "../../assets/images/error-icon.svg"

const RegisterForm = ({ sendCredentialsToServer }) => {
  let history = useHistory()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rPassword, setRPassword] = useState("")
  const [newsletter, setNewsletter] = useState(false)
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    same: false,
    existing: false
  })
  const [queryStatus, setQueryStatus] = useState({
    processing: false
  })

  const registerFormRef = useRef()

  useEffect(() => {
    registerFormRef.current.onsubmit = () => {
      setErrors({
        username: !new RegExp(/^(?=.{0,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).test(username),
        email: !new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email),
        password: !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password),
        same: password !== rPassword,
        existing: false
      })
    }
  }, [username, email, password, rPassword, registerFormRef])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setQueryStatus({
      processing: true
    })

    try {
      if (errors.username || errors.email || errors.password || errors.same) throw new Error("Invalid credentials")

      await sendCredentialsToServer(username, email, password, newsletter)

      setUsername("")
      setEmail("")
      setPassword("")
      setRPassword("")
      setNewsletter(false)

      setQueryStatus({
        processing: false
      })

      history.push("/account-confirmation")

    } catch (error) {
      setQueryStatus({
        processing: false
      })

      if (error.message !== "Invalid credentials") {
        setErrors({
          ...errors,
          existing: true
        })
      }
    }
  }

  return (
    <form className="registerForm mt-4" onSubmit={handleSubmit} ref={registerFormRef}>
      <div className={ errors.username || errors.existing ? "chart error" : "chart" }>
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
      { errors.username ? <div className="error-msg"> Erreur: le nom d'utilisateur n'est pas valide. </div> : null}
      { errors.existing ? <div className="error-msg"> Erreur: ce compte existe déjà. </div> : null}

      <div className={ errors.email || errors.existing ? "chart error" : "chart" }>
        <GoMail style={{ color: 'white', marginLeft: "15px" }}/>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required="required"
          autoComplete="off"
        />
        { errors.email || errors.existing ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
      </div>
      { errors.email ? <div className="error-msg"> Erreur: adresse mail invalide. </div> : null}

      <div className={ errors.password || errors.same ? "chart error" : "chart" }>
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
        { errors.password || errors.same ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
      </div>
      { errors.password ? <div className="error-msg"> 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial requis. </div> : null}
      { errors.same ? <div className="error-msg"> Erreur: les mots de passe ne correspondent pas. </div> : null}

      <div className={ errors.same ? "chart error" : "chart" }>
        <ImKey2 style={{ color: 'white', marginLeft: "15px" }}/>
        <input
          type="password"
          name="r-password"
          id="r-password"
          value={rPassword}
          onChange={(e) => setRPassword(e.target.value)}
          required="required"
          placeholder="Répéter mot de passe"
          autoComplete="off"
        />
        { errors.same ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={newsletter}
          id="newsletter"
          onChange={() => setNewsletter(!newsletter)}
        />
        <label className="form-check-label" htmlFor="newsletter">
          Recevoir les newsletters de LS Vibes
        </label>
      </div>

      <span>
        IMPORTANT : VOUS NE DEVEZ EN AUCUN CAS PARTAGER VOS IDENTIFIANTS AVEC UNE
        TIERCE PERSONNE SOUS PEINE DE BANNISEMENT.
      </span>

      {
        queryStatus.processing ?
          <button className="btn btn-primary submit" type="submit" disabled="disabled"> <ReactLoading className='btn-animation' type={'bubbles'} color={'white'} /> </button>
          : <button className="btn btn-primary submit" type="submit"> S'inscrire </button>
      }
    </form>
  )
}

export default RegisterForm