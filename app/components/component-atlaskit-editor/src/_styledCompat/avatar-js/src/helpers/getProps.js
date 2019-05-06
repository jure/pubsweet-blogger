//

const getAppearanceProps = props => {
  const {
    appearance,
    backgroundColor,
    borderColor,
    groupAppearance,
    isActive,
    isDisabled,
    isFocus,
    isHover,
    isInteractive,
    isSelected,
    size,
    stackIndex,
  } = props

  return {
    appearance,
    backgroundColor,
    borderColor,
    groupAppearance,
    isActive,
    isDisabled,
    isFocus,
    isHover,
    isInteractive,
    isSelected,
    size,
    stackIndex,
  }
}

const getInteractionProps = props => {
  const {
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  } = props

  return {
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  }
}

const getLinkElementProps = props => {
  const { href, target } = props

  // handle security issue for consumer
  // https://mathiasbynens.github.io/rel-noopener
  const rel = target === '_blank' ? 'noopener noreferrer' : null

  return { href, rel, target }
}

const getButtonElementProps = props => {
  const { id, isDisabled } = props

  return { id, type: 'button', disabled: isDisabled }
}

// TODO: type this correctly
export default function getProps(component) {
  const { props } = component

  const defaultProps = {
    ...getAppearanceProps(props),
    ...getInteractionProps(props),
  }

  if (props.component) {
    return {
      ...defaultProps,
      ...props,
    }
  }

  if (props.href) {
    if (props.isDisabled) {
      return defaultProps
    }

    return {
      ...defaultProps,
      ...getLinkElementProps(props),
    }
  }

  if (props.onClick) {
    return {
      ...defaultProps,
      ...getButtonElementProps(props),
    }
  }

  return defaultProps
}
