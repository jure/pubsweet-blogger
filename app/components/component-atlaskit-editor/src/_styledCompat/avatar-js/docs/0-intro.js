//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'
import SectionMessage from '@atlaskit/section-message'

export default md`
  ${(
    <SectionMessage appearance="warning">
      <p>
        <strong>
          The previous export of `AvatarGroup` has been moved to its own package
          `@atlaskit/avatar-group`.
        </strong>
      </p>
      <p>
        Please update your dependencies to use the @atlaskit/avatar-group
        package.
      </p>
    </SectionMessage>
  )}

  This package exports an number of different Avatar related components:

  - Avatar (Default Export)
  - [AvatarItem](/packages/core/avatar/docs/avatar-item)
  - [Presence](/packages/core/avatar/docs/presence)
  - [Status](/packages/core/avatar/docs/status)
  - [Skeleton](/packages/core/avatar/docs/skeleton)

  
  Use the \`Avatar\` component to represent users with their profile picture.
  Optionally, a presence to indicate online status can also be displayed.

  You can use the \`Presence\` component independently for contexts where the
  profile picture is not required (e.g. next to a username).
  
  ## Usage

  ${code`import Avatar from '@atlaskit/avatar';`}

  ${(
    <Example
      Component={require('../examples/01-basicAvatar').default}
      packageName="@atlaskit/avatar"
      source={require('!!raw-loader!../examples/01-basicAvatar')}
      title="Avatar"
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/Avatar')}
    />
  )}
`
