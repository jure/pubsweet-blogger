import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthenticatedComponent from 'pubsweet-client/src/components/AuthenticatedComponent'

import ConnectedNavigation from './Navigation/ConnectedNavigation'
import HelloWorld from './HelloWorld'
import KitchenSink from './KitchenSink'

const Dashboard = () => (
  <>
    {/* Everything in the dashboard is for authenticated users only */}
    <AuthenticatedComponent>
      <ConnectedNavigation />
      <Switch>
        <Redirect exact path="/dashboard" to="/dashboard/hello-world" />
        <Route component={HelloWorld} path="/dashboard/hello-world" />
        <Route component={KitchenSink} path="/dashboard/kitchen-sink" />
      </Switch>
    </AuthenticatedComponent>
  </>
)

export default Dashboard
