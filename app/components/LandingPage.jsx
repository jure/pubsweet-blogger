import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Action, Section } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

export const GET_POSTS = gql`
  {
    posts {
      id
      title
      updated
      created
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

const Title = styled.h1``

const Authors = styled.div``
const Actions = styled.div`
  margin-top: 1rem;
`

const PostsList = styled.div``

const Post = styled.div`
  border-bottom: 1px solid ${th('colorPrimary')};
  margin-bottom: 1rem;
  padding: 0 1rem 1rem 1rem;
  flex: 0 1 100%;
  @media (min-width: 40em) {
    flex: 0 1 calc(50% - 1em);
  }

  @media (min-width: 60em) {
    flex: 0 1 calc(33% - 1em);
  }
`

const PaddedAction = styled(Action)`
  padding-right: 1rem;

  &:not(:last-of-type) {
    padding-right: 0rem;
  }
`

const StyledSection = styled(Section)`
  margin: 0 calc(${th('gridUnit')} * 3) calc(${th('gridUnit')} * 3) 1rem;
`

const Metadata = styled.div`
  font-style: italic;
  margin-top: -1rem;
  margin-bottom: 1rem;
`

const LandingPage = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <StyledSection>
          <PostsList>
            {data.posts.map(post => (
              <Post key={post.id}>
                <Title>{post.title || 'Untitled'}</Title>
                <Metadata>
                  Created {new Date(parseInt(post.created)).toLocaleString()}{' '}
                  (updated {new Date(parseInt(post.updated)).toLocaleString()})
                </Metadata>
                <Authors>
                  Authors:{' '}
                  {post.team.members.map(m => m.user.username).join(', ')}
                </Authors>
                <Actions>
                  <PaddedAction to={`/post/${post.id}`}>Read more</PaddedAction>
                </Actions>
              </Post>
            ))}
          </PostsList>
        </StyledSection>
      )
    }}
  </Query>
)

export default LandingPage
