import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Action, ActionGroup, Flexbox, H1, Icon, Section } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import CreatePost from './CreatePost'
import DeletePost from './DeletePost'

import Select from '../../Select'

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

const Title = styled.h2`
  flex: 2;
`

const Authors = styled.div`
  flex: 2;
`
const Actions = styled.div`
  margin-top: 1rem;
  flex: 1;
`

const PostsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

`

const Post = styled.div`
  box-shadow: 0 0 1px ${th('colorPrimary')};
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

const Posts = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <StyledSection>
          <H1>Your posts</H1>
          <PostsList>
            {data.posts.map(post => (
              <Post key={post.id}>
                <Title>{post.title || 'Untitled'}</Title>
                <Metadata>
                  Created {new Date(parseInt(post.created)).toLocaleString()} (updated {new Date(parseInt(post.updated)).toLocaleString()})
                 </Metadata>
                <Authors>
                  Authors:
                  <Select members={post.team.members} teamId={post.team.id} />
                </Authors>
                <Actions>
                  <PaddedAction to={`/dashboard/editor/${post.id}`}>
                    <Icon primary size={2}>
                      edit
                    </Icon>
                    Edit
                  </PaddedAction>
                  <DeletePost postId={post.id} />
                </Actions>
              </Post>
            ))}
          </PostsList>
          <CreatePost />
        </StyledSection>
      )
    }}
  </Query>
)

export default Posts

// const AddTodo = () => {
//   let input

//   return (
//     <Mutation mutation={ADD_TODO}>
//       {(addTodo, { data }) => (
//         <div>
//           <form
//             onSubmit={e => {
//               e.preventDefault()
//               addTodo({ variables: { type: input.value } })
//               input.value = ''
//             }}
//           >
//             <input
//               ref={node => {
//                 input = node
//               }}
//             />
//             <button type="submit">Add Todo</button>
//           </form>
//         </div>
//       )}
//     </Mutation>
//   )
// }
