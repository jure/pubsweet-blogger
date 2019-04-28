import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Action, ActionGroup } from '@pubsweet/ui'

import CreatePost from './CreatePost'

export const GET_POSTS = gql`
  {
    fragments {
      id
      title
    }
  }
`

const Posts = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <>
          {data.fragments.map(post => (
            <React.Fragment key={post.id}>
              <ActionGroup>
                <span key={post.id}>{post.title}</span>
                <Action to={`/dashboard/editor/${post.id}`}>Edit</Action>
                <Action>Delete</Action>
              </ActionGroup>
            </React.Fragment>
          ))}
          <CreatePost />
        </>
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
