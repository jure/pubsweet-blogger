import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthenticatedComponent from 'pubsweet-client/src/components/AuthenticatedComponent'
import Editor from './component-atlaskit-editor/src/Editor.tsx'
import ConnectedNavigation from './Navigation/ConnectedNavigation'
import Posts from './component-posts'

const Dashboard = () => (
  <>
    {/* Everything in the dashboard is for authenticated users only */}
    <AuthenticatedComponent>
      <ConnectedNavigation />
      <Switch>
        <Redirect exact path="/dashboard" to="/dashboard/posts" />
        <Route component={Posts} path="/dashboard/posts" />
        <Route component={Editor} path="/dashboard/editor/:id" />
      </Switch>
    </AuthenticatedComponent>
  </>
)

export default Dashboard
