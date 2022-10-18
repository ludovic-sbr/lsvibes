import React, { useEffect, useRef, useState } from 'react'
import ErrorIcon from '../../assets/images/error-icon.svg'
import { ImKey2 } from 'react-icons/im'
import { CgPassword } from "react-icons/cg"
import ReactLoading from 'react-loading'

const Password = ({ sendCredentialsToServer }) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")
  const [rPassword, setRPassword] = useState("")
  const [errors, setErrors] = useState({
    currentPassword: false,
    password: false,
    same: false,
  })
  const [queryStatus, setQueryStatus] = useState({
    processing: false
  })

  const passwordFormRef = useRef()

  useEffect(() => {
    passwordFormRef.current.onsubmit = () => {
      setErrors({
        currentPassword: false,
        password: !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password),
        same: password !== rPassword
      })
    }
  }, [password, rPassword, passwordFormRef])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setQueryStatus({
      processing: true
    })

    try {
      if (errors.password || errors.same) throw new Error("Invalid credentials")

      await sendCredentialsToServer(currentPassword, password)

      setCurrentPassword("")
      setPassword("")
      setRPassword("")

      setQueryStatus({
        processing: false
      })

    } catch (error) {
      setQueryStatus({
        processing: false
      })

      if (error.message !== "Invalid credentials") {
        setErrors({
          ...errors,
          currentPassword: true
        })
      }
    }
  }

  return (
    <div className="password">
      <form className="passwordForm mx-auto" onSubmit={handleSubmit} ref={passwordFormRef}>
        <div className={ errors.currentPassword ? "chart error" : "chart" }>
          <CgPassword style={{ color: 'white', marginLeft: "15px" }}/>
          <input
            type="password"
            name="code"
            id="code"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required="required"
            placeholder="Mot de passe actuel"
            autoComplete="off"
          />
          { errors.currentPassword ? <img className="error-icon icon-user" src={ErrorIcon} alt="" height="16px" /> : null }
        </div>
        { errors.currentPassword ? <div className="error-msg"> Erreur: mot de passe incorrect. </div> : null}

        <div className={ errors.password || errors.same ? "chart error" : "chart" }>
          <ImKey2 style={{ color: 'white', marginLeft: "15px" }}/>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required="required"
            placeholder="Nouveau mot de passe"
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

        {
          queryStatus.processing ?
            <button className="btn btn-primary submit mt-3" type="submit" disabled="disabled"> <ReactLoading className='btn-animation' type={'bubbles'} color={'white'} /> </button>
            : <button className="btn btn-primary submit mt-3" type="submit"> Confirmer </button>
        }

      </form>
    </div>
  )
}

export default Password