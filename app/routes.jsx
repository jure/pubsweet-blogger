import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Authentication
import Login from 'pubsweet-component-login'
import Signup from 'pubsweet-component-signup'
import PasswordReset from '@pubsweet/component-password-reset-client'

import App from './components/App'

// This is your presentation side of things
import LandingPage from './components/LandingPage'

// And this is where your admin stuff goes
import Dashboard from './components/Dashboard'

export default (
  <App>
    <Switch>
      <Route component={LandingPage} exact path="/" />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={Login} path="/login" />
      <Route component={Signup} path="/signup" />
      <Route component={PasswordReset} path="/password-reset" />
    </Switch>
  </App>
)
