//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'

export default md`

\`Status\` Indicates contextual information by showing a small icon on the avatar. In most
cases, you can pass the string of the status you want directly to avatar instead
of using this component directly.

## Usage

${code`import { Status } from '@atlaskit/avatar';`}

${(
  <Example
    Component={require('../examples/05-basicStatus').default}
    packageName="@atlaskit/avatar"
    source={require('!!raw-loader!../examples/05-basicStatus')}
    title="Status"
  />
)}

${(
  <Props
    heading="Status Props"
    props={require('!!extract-react-types-loader!../src/components/Status')}
  />
)}
`
