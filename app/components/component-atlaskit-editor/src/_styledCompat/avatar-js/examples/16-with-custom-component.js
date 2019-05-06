//
import React from 'react'
import Avatar from '../src'

function CustomComponent({ children }) {
  return <span>{children}</span>
}

export default function WithCustomComponent({ className }) {
  return (
    <Avatar
      appearance="circle"
      className={className}
      component={CustomComponent}
      href="#"
      presence="busy"
      size="xlarge"
      src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
    />
  )
}
