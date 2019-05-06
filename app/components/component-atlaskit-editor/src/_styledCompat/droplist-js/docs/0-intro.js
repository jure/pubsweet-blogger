//
import React from 'react'
import { md, Example, Props, code } from '@atlaskit/docs'

export default md`

An internal base component for implementing dropdown and select components.

 ## Usage

${code`
import DropList, {
  DroplistGroup,
  Item
} from '@atlaskit/droplist';
`}

  This is a base component on which such components as @atlaskit/dropdown-menu,
  @atlaskit/single-select, @atlaskit/multi-select are built. It contains only styles and
  very basic logic. It does not have any keyboard interactions, selectable logic or
  open/close functionality

  ${(
    <Example
      Component={require('../examples/00-basic-example').default}
      packageName="@atlaskit/droplist"
      source={require('!!raw-loader!../examples/00-basic-example')}
      title="Basic"
    />
  )}

  ${(
    <Example
      Component={require('../examples/01-bound-example').default}
      packageName="@atlaskit/droplist"
      source={require('!!raw-loader!../examples/01-bound-example')}
      title="With Label"
    />
  )}

   ${(
     <Props
       heading="Droplist Props"
       props={require('!!extract-react-types-loader!../src/components/Droplist')}
     />
   )}

   ${(
     <Props
       heading="Group Props"
       props={require('!!extract-react-types-loader!../src/components/Group')}
     />
   )}

   ${(
     <Props
       heading="Element Props"
       props={require('!!extract-react-types-loader!../src/components/Element')}
     />
   )}

  ${(
    <Props
      heading="Item Props"
      props={require('!!extract-react-types-loader!../src/components/Item')}
    />
  )}
`
