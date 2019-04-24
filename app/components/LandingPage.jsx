import React from 'react'
import { Action, ActionGroup } from '@pubsweet/ui'

const LandingPage = () => (
  <>
    <div>Hello World! Your PubSweet application is running just fine!</div>
    <ActionGroup>
      <Action to="/login">Login</Action>
      <Action to="/signup">Signup</Action>
      <Action to="/dashboard">Dashboard</Action>
    </ActionGroup>
  </>
)

export default LandingPage
