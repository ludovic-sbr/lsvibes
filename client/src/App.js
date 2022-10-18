import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'

import { fetchUser } from './reducers/user'

import Header from "./components/header"
import Preloader from './components/preloader'

import Home from "./components/home"

import Login from "./components/login"
import LoginConfirmation from './components/login/LoginConfirmation'
import Logout from './components/login/Logout'

import Dashboard from "./components/dashboard"

import Register from "./components/register"
import AccountConfirmation from './components/register/AccountConfirmation'

const App = () => {
  const [sessionToken] = useState(localStorage.getItem("sessionToken"))
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    dispatch(fetchUser(sessionToken))
  }, [dispatch, sessionToken])

  return (
    <BrowserRouter>
      <Preloader />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route exact path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/login-confirmation" exact component={LoginConfirmation} />
        <Route path="/logout" exact component={Logout} />

        <Route exact path="/register">
          {user ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        <Route path="/account-confirmation" exact component={AccountConfirmation} />

        <Route exact path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/login" />}
        </Route>

        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
