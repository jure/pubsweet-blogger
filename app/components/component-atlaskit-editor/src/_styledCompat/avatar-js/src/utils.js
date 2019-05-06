//
import {} from 'react'

export function omit(obj, ...keysToOmit) {
  const newObj = { ...obj }

  for (const key of keysToOmit) {
    delete newObj[key]
  }
  return newObj
}

export function getDisplayName(prefix, Component) {
  const componentName = Component.displayName || Component.name

  return componentName ? `${prefix}(${componentName})` : prefix
}
