import React from 'react'
import { Transition } from 'react-transition-group'

const ENTER_DURATION = 120
const EXIT_DURATION = 80
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)' // easeOutQuint
const distance = 8

const horizontalOffset = {
  left: distance,
  right: -distance,
  top: 0,
  bottom: 0,
}
const verticalOffset = {
  bottom: -distance,
  top: distance,
  left: 0,
  right: 0,
}

const defaultStyle = timeout => ({
  transition: `transform ${timeout.enter}ms ${easing}, opacity ${
    timeout.enter
  }ms linear`,
  opacity: 0,
})

const transitionStyle = (timeout, state, position) => {
  const transitions = {
    entering: {
      transform: `translate3d(${horizontalOffset[position]}px, ${
        verticalOffset[position]
      }px, 0)`,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
      transition: `${timeout.exit}ms linear`,
      transform: `translate3d(${horizontalOffset[position] /
        2}px, ${verticalOffset[position] / 2}px, 0)`,
    },
  }
  return transitions[state]
}

const getStyle = (timeout, state) => position => ({
  ...defaultStyle(timeout),
  ...transitionStyle(timeout, state, position),
})

const Animation = ({
  children,
  immediatelyHide,
  immediatelyShow,
  onExited,
  in: inProp,
}) => {
  const timeout = {
    enter: immediatelyShow ? 1 : ENTER_DURATION,
    exit: immediatelyHide ? 1 : EXIT_DURATION,
  }
  return (
    <Transition
      appear
      in={inProp}
      onExited={onExited}
      timeout={timeout}
      unmountOnExit
    >
      {state => children(getStyle(timeout, state))}
    </Transition>
  )
}

export default Animation
