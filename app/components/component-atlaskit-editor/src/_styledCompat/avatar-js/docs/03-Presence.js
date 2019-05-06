//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'

export default md`

The \`Presence\` component is the status dot. In most cases, you will not need to use
the presence component directly, as passing string values of 'presence' to \`Avatar\` will
use the selected presence. Presence is displayed at the bottom right of the avatar.

## Usage

${code`import { Presence } from '@atlaskit/avatar';`}

${(
  <Example
    Component={require('../examples/04-basicPresence').default}
    packageName="@atlaskit/avatar"
    source={require('!!raw-loader!../examples/04-basicPresence')}
    title="Presence"
  />
)}

${(
  <Props
    heading="Presence Props"
    props={require('!!extract-react-types-loader!../src/components/Presence')}
  />
)}
`
