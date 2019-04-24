import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Navigation from './Navigation'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      admin
    }
  }
`

const ConnectedNavigation = props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'

      return (
        <ApolloConsumer>
          {client => (
            <Navigation
              client={client}
              currentUser={data.currentUser}
              loading={loading}
              {...props}
            />
          )}
        </ApolloConsumer>
      )
    }}
  </Query>
)

export default ConnectedNavigation
