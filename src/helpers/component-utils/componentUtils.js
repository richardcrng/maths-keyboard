import React from 'react';

export const executeIfFunction = (callback, ...args) => {
  try {
    if (typeof callback === 'function') {
      return callback(...args)
    }
  } catch (err) {
    console.log(err)
  }
}

export const makeExecuteIfFunction = callback => {
  return (...args) => {
    return executeIfFunction(callback, ...args)
  }
}

export const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const makeChildrenRenderWith = callback => {
  return props => (
    React.Children.map(props.children, child => callback(child))
  )
}

export const makeChildrenRenderWrappedBy = (Component, wrapProps) => {
  return props => (
    React.Children.map(props.children, child => <Component {...wrapProps}>{child}</Component>)
  )
}