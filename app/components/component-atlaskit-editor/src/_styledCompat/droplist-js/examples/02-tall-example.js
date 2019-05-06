//
import React, { PureComponent } from 'react'
import { Label } from '@atlaskit/field-base'
import Button from '@atlaskit/button'
import Item, { ItemGroup } from '@atlaskit/item'
import DropList from '../src'

export default class TallExample extends PureComponent {
  state = {
    eventResult: 'Click into and out of the content to trigger event handlers',
  }

  onKeyDown = () => {
    this.setState({
      eventResult: 'onKeyDown called',
    })
  }

  onClick = () => {
    this.setState({
      eventResult: 'onClick called',
    })
  }
  onOpenChange = () => {
    this.setState({
      eventResult: 'onOpenChange called',
    })
  }
  onItemActivated = () => {
    this.setState({
      eventResult: 'Item onActivated called',
    })
  }

  render() {
    return (
      <div>
        <Label label="With event handlers" />
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.eventResult}
        </div>
        <DropList
          appearance="tall"
          isOpen
          isTriggerNotTabbable
          onClick={this.onClick}
          onOpenChange={this.onOpenChange}
          position="right top"
          trigger={<Button isSelected>...</Button>}
        >
          <ItemGroup title="Australia">
            <Item href="//atlassian.com" target="_blank">
              Sydney
            </Item>
            <Item>Canberra</Item>
            <Item>Adelaide</Item>
            <Item>Hobart</Item>
            <Item isHidden>Hidden item</Item>
            <Item isDisabled>Brisbane</Item>
            <Item onActivated={this.onItemActivated}>Melbourne</Item>
          </ItemGroup>
          <ItemGroup title="Brazil">
            <Item>Porto Alegre</Item>
            <Item>São Paulo</Item>
            <Item isDisabled>Rio de Janeiro</Item>
          </ItemGroup>
        </DropList>
      </div>
    )
  }
}
