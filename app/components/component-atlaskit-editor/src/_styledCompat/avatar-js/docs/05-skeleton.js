//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'

export default md`

The \`Skeleton\`component is used for loading states. 

## Usage

${code`import { Skeleton } from '@atlaskit/avatar';`}

${(
  <Example
    Component={require('../examples/15-skeleton').default}
    packageName="@atlaskit/avatar"
    source={require('!!raw-loader!../examples/15-skeleton')}
    title="Skeleton"
  />
)}

${(
  <Props
    heading="Skeleton Props"
    props={require('!!extract-react-types-loader!../src/components/Skeleton')}
  />
)}
`
