import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TextField, Button, H1 } from '@pubsweet/ui'

import { GET_POSTS } from './index'

const CREATE_POST_WITH_TEAM = gql`
  mutation createPostWithTeam($input: FragmentInput) {
    createPostWithTeam(input: $input) {
      id
      title
      team {
        id
        members {
          id
          user {
            id
            username
          }
        }
      }
    }
  }
`

const CreatePost = () => {
  const [title, setTitle] = useState('')

  return (
    <Mutation
      mutation={CREATE_POST_WITH_TEAM}
      update={(cache, { data: { createPostWithTeam } }) => {
        const { posts } = cache.readQuery({ query: GET_POSTS })
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: posts.concat([createPostWithTeam]) },
        })
      }}
    >
      {(createPost, { data }) => (
        <div>
          <H1>Create a new post</H1>
          <form
            onSubmit={e => {
              e.preventDefault()
              createPost({
                variables: {
                  input: {
                    fragmentType: 'blogpost',
                    title,
                  },
                },
              })
              setTitle('')
            }}
          >
            <TextField
              onChange={e => setTitle(e.target.value)}
              placeholder="Post title here..."
              value={title}
            />
            <Button primary type="submit">
              Create
            </Button>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default CreatePost
