import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TextField, Button } from '@pubsweet/ui'

import { GET_POSTS } from './index'

const CREATE_POST = gql`
  mutation createFragment($input: FragmentInput) {
    createFragment(input: $input) {
      id
      title
    }
  }
`

const CreatePost = () => {
  const [title, setTitle] = useState('')

  return (
    <Mutation
      mutation={CREATE_POST}
      update={(cache, { data: { createFragment } }) => {
        const { fragments } = cache.readQuery({ query: GET_POSTS })
        cache.writeQuery({
          query: GET_POSTS,
          data: { fragments: fragments.concat([createFragment]) },
        })
      }}
    >
      {(createPost, { data }) => (
        <div>
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
