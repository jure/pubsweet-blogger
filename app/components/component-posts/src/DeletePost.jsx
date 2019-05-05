import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Action, Icon } from '@pubsweet/ui'

import { GET_POSTS } from './index'

const DELETE_POST = gql`
  mutation deleteFragment($id: ID) {
    deleteFragment(id: $id) {
      id
    }
  }
`

const CreatePost = props => {
  const postId = props.postId
  return (
    <Mutation
      mutation={DELETE_POST}
      update={(cache, { data: { deleteFragment } }) => {
        let { posts } = cache.readQuery({ query: GET_POSTS })
        posts = posts.filter(post => post.id !== deleteFragment.id)
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts },
        })
      }}
    >
      {(deleteFragment, { data }) => {
        const handleDelete = e => {
          e.preventDefault()
          deleteFragment({
            variables: {
              id: postId,
            },
          })
        }

        return (
          <Action onClick={handleDelete}>
            <Icon primary size={2}>
              trash
            </Icon>
            Delete
          </Action>
        )
      }}
    </Mutation>
  )
}

export default CreatePost
