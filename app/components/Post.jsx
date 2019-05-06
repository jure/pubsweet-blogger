import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Action, Section } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import PostRenderer from './PostRenderer.tsx'

const Title = styled.h1``

const Authors = styled.div``

const Metadata = styled.div``

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 32px;
`
export const GET_POST = gql`
  query post($id: ID) {
    post(id: $id) {
      id
      title
      updated
      created
      source
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

const Post = props => (
  <Query query={GET_POST} variables={{ id: props.match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`
      const post = data.post
      return (
        <>
          <Container>
            <Title>{post.title || 'Untitled'}</Title>
            <Metadata>
              Created {new Date(parseInt(post.created)).toLocaleString()}{' '}
              (updated {new Date(parseInt(post.updated)).toLocaleString()})
            </Metadata>
            <Authors>
              Authors: {post.team.members.map(m => m.user.username).join(', ')}
            </Authors>
          </Container>
          <PostRenderer
            appearance="full-page"
            document={post.source}
            serializer="react"
          />
        </>
      )
    }}
  </Query>
)

export default Post
