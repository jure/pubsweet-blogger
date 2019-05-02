import React from 'react'

import AsyncSelect from 'react-select/lib/Async'

import { withTheme } from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USERS = gql`
  {
    users {
      id
      username
    }
  }
`

const UPDATE_TEAM = gql`
  mutation($id: ID, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      name
      members {
        user {
          id
        }
      }
    }
  }
`

const filterUsers = (users, inputValue) =>
  users.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))

const getUsers = client => inputValue =>
  client
    .query({ query: GET_USERS })
    .then(({ data }) =>
      data.users.map(u => ({
        label: u.username,
        value: u.id,
      })),
    )
    .then(users => filterUsers(users, inputValue))

class AsyncMulti extends React.Component {
  handleChange = async (newValue, action) => {
    const members = newValue.map(v => ({
      user: {
        id: v.value,
      },
    }))
    await this.props.client.mutate({
      mutation: UPDATE_TEAM,
      variables: {
        id: this.props.teamId,
        input: {
          members,
        },
      },
    })
  }

  render() {
    const defaultValue = this.props.members.map(member => ({
      value: member.user.id,
      label: member.user.username,
    }))
    const psTheme = this.props.theme
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        defaultValue={defaultValue}
        isMulti
        loadOptions={getUsers(this.props.client)}
        onChange={this.handleChange}
        theme={theme => ({
          ...theme,
          borderRadius: psTheme.borderRadius,
          spacing: {
            baseUnit: parseInt(psTheme.gridUnit) / 2,
            controlHeight: '40',
          },
          colors: {
            ...theme.colors,
            primary: psTheme.colorPrimary,
            danger: psTheme.colorError,
          },
        })}
      />
    )
  }
}

export default withApollo(withTheme(AsyncMulti))

// All theme variables:
// borderRadius: 4
// colors:
// danger: "#DE350B"
// dangerLight: "#FFBDAD"
// neutral0: "hsl(0, 0%, 100%)"
// neutral5: "hsl(0, 0%, 95%)"
// neutral10: "hsl(0, 0%, 90%)"
// neutral20: "hsl(0, 0%, 80%)"
// neutral30: "hsl(0, 0%, 70%)"
// neutral40: "hsl(0, 0%, 60%)"
// neutral50: "hsl(0, 0%, 50%)"
// neutral60: "hsl(0, 0%, 40%)"
// neutral70: "hsl(0, 0%, 30%)"
// neutral80: "hsl(0, 0%, 20%)"
// neutral90: "hsl(0, 0%, 10%)"
// primary: "#2684FF"
// primary25: "#DEEBFF"
// primary50: "#B2D4FF"
// primary75: "#4C9AFF"
// __proto__: Object
// spacing:
// baseUnit: 4
// controlHeight: 38
