import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Action, ActionGroup, Flexbox, H1, Icon, Section } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import CreatePost from './CreatePost'

export const GET_POSTS = gql`
  {
    fragments {
      id
      title
    }
  }
`

const Title = styled.span`
  flex: 2;
`

const Authors = styled.span`
  flex: 2;
`
const Actions = styled.div`
  flex: 1;
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

const Posts = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <StyledSection>
          <H1>Your posts</H1>
          <Flexbox>
              <Title>Title</Title>
              <Authors>Authors</Authors>
              <Actions>Actions</Actions>
          </Flexbox>
          {data.fragments.map(post => (
            <React.Fragment key={post.id}>
              <Flexbox>
                <Title>{post.title}</Title>
                <Authors>user1, user2<Icon size={2}>plus</Icon></Authors>
                <Actions>
                <PaddedAction to={`/dashboard/editor/${post.id}`}>Edit</PaddedAction>
                <PaddedAction to=''>Delete</PaddedAction>
                </Actions>
              </Flexbox>
            </React.Fragment>
          ))}
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
