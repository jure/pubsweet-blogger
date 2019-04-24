import React from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      admin
    }
  }
`

const CurrentUserQuery = props => {
  const { render } = props
  return (
    <Query fetchPolicy="network-only" query={CURRENT_USER}>
      {render}
    </Query>
  )
}

CurrentUserQuery.propTypes = {
  render: PropTypes.any, // eslint-disable-line
}

export default CurrentUserQuery
