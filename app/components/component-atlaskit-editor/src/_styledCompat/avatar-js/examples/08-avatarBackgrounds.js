//
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { colors } from '@atlaskit/theme'
import Avatar from '../src'
import { Code, Note } from '../examples-util/helpers'
import nucleusImage from '../examples-util/nucleus.png'
import { avatarUrl } from '../examples-util/data'

const exampleColors = [colors.N800, colors.B500, colors.N20, colors.N0]

const presences = ['focus', 'online', 'offline', 'busy']
const statuses = ['approved', 'locked', 'declined']
const styles = {
  column: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0.5em 1em',
  },
  row: {
    alignItems: 'stretch',
    display: 'flex',
    height: 192,
    justifyContent: 'stretch',
    marginTop: '1em',
  },
}

const ColorColumn = props => (
  <div style={{ ...styles.column, backgroundColor: props.borderColor }}>
    <Avatar onClick={console.log} {...props} size="xlarge" />
    <Avatar onClick={console.log} {...props} />
  </div>
)
export default () => (
  <div>
    <h2>Coloured Backgrounds</h2>
    <Note>
      <p>
        The <Code>borderColor</Code> is consumed by <Code>{'<Avatar/>'}</Code>{' '}
        and passed on to <Code>{'<Presence/>'}</Code>
        and <Code>{'<Status/>'}</Code>
      </p>
      <p>
        Try clicking/tabbing on the avatars to see how the focus ring interacts
        with the background color.
      </p>
    </Note>
    <div style={styles.row}>
      {exampleColors.map((color, index) => (
        <ColorColumn
          borderColor={color}
          key={index}
          presence={presences[index]}
          src={avatarUrl}
        />
      ))}
    </div>
    <div style={styles.row}>
      {exampleColors.map((color, index) => (
        <ColorColumn
          appearance="square"
          borderColor={color}
          key={index}
          src={nucleusImage}
          status={statuses[index]}
        />
      ))}
    </div>
  </div>
)
