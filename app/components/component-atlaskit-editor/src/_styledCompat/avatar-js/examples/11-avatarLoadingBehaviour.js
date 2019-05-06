//
import React, { Component } from 'react'
import { gridSize } from '@atlaskit/theme'
import Button from '@atlaskit/button'
import { Note } from '../examples-util/helpers'
import Avatar from '../src'

const Btn = props => (
  <span style={{ marginLeft: gridSize() }}>
    <Button type="button" {...props} />
  </span>
)

const initialState = {
  inputValue:
    'https://pbs.twimg.com/profile_images/568401563538841600/2eTVtXXO_400x400.jpeg',
  imageUrl: '',
}

// eslint-disable-next-line react/no-multi-comp
export default class ExternalSrcAvatar extends Component {
  state = initialState

  changeUrl = event => this.setState({ inputValue: event.target.value })

  loadImage = event => {
    event.preventDefault()
    this.setState({ imageUrl: this.state.inputValue })
  }

  resetState = () => this.setState(initialState)

  render() {
    const { inputValue, imageUrl } = this.state
    let avatarName = 'Default Avatar'
    if (imageUrl === initialState.inputValue) avatarName = 'Mike Cannon-Brookes'
    else if (imageUrl.length) avatarName = 'Custom Avatar'

    return (
      <form onSubmit={this.loadImage}>
        <Note size="large">Try pasting a URL to see the loading behavior:</Note>
        <div
          style={{
            display: 'flex',
            marginBottom: gridSize(),
            marginTop: gridSize(),
          }}
        >
          <input
            onChange={this.changeUrl}
            style={{ flex: 1 }}
            type="text"
            value={inputValue}
          />
          <Btn appearance="primary" type="submit">
            Load Image
          </Btn>
          <Btn onClick={this.resetState}>Reset</Btn>
        </div>
        <Avatar name={avatarName} size="xlarge" src={imageUrl} />
      </form>
    )
  }
}
