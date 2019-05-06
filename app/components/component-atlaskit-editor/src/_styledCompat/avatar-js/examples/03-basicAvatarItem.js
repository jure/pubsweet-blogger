//
import React from 'react'
import Avatar, { AvatarItem } from '../src'
import { RANDOM_USERS, getAdorableAvatar } from '../examples-util/data'

function getPresence() {
  const chance = Math.random()
  switch (true) {
    case chance > 0.5 && chance < 0.8:
      return 'focus'
    case chance < 0.25:
      return 'busy'
    case chance < 0.5:
      return 'online'
    default:
      return 'offline'
  }
}

export default () => {
  const data = RANDOM_USERS.slice(0, 10).map(user => ({
    ...user,
    src: getAdorableAvatar(user.email),
  }))

  return (
    <div style={{ maxWidth: 270 }}>
      {data.map(user => (
        <AvatarItem
          avatar={<Avatar presence={getPresence()} src={user.src} />}
          key={user.email}
          onClick={console.log}
          primaryText={user.name}
          secondaryText={user.email}
        />
      ))}
    </div>
  )
}
