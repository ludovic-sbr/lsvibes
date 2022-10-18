import jwt from 'jsonwebtoken'
import config from "../config.json"
import api from "./api"

const auth = () => {}

const reducerInitialState = null

auth.login = (sessionToken) => {
  try {
    if (sessionToken === null || sessionToken === undefined) throw new Error()

    // On vérifie la validité du token et on récupère le payload + uuid
    let payload = jwt.verify(sessionToken, config.env.tokenKey)

    // On fetch l'user en bdd grâce à l'uuid
    api.post(
      '/session/new',
      payload.userUid
    ).then(res => {
      if (res.status === 200) {
        // On stocke le token dans les cookies
        localStorage.setItem("sessionToken", sessionToken)
        // On retourne la data à stocker dans le store
        return res.data
      }
    }).catch(() => { return reducerInitialState })
  } catch {
    return reducerInitialState
  }
}

auth.logout = () => {
  localStorage.removeItem("sessionToken")
  return reducerInitialState
}

export default auth
