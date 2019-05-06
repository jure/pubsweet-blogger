//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'

export default md`
\`AvatarItem\` is a wrapper designed to go around \`Avatar\`, when th avatar
will be displayed alongside text, such as a name and status.

## Usage

${code`import { AvatarItem } from '@atlaskit/avatar';`}

${(
  <Example
    Component={require('../examples/03-basicAvatarItem').default}
    packageName="@atlaskit/avatar"
    source={require('!!raw-loader!../examples/03-basicAvatarItem')}
    title="Avatar Item"
  />
)}

${(
  <Props
    heading="Avatar Item Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarItem')}
  />
)}
`
