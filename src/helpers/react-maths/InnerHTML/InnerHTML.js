import * as R from 'ramda'
import React from 'react'

/**
 * 
 * @param {Object} props
 * @param {String} [props.element = 'div'] - The HTML element type to render
 * @param {String} [props.children]
 * @param {String} [props.html] - The HTML to use as InnerHTML of the element
 * @param {function} [props.parser] - The parser function for the html
 */
function InnerHTML({ element = 'div', children, html, parser = R.identity, ...rest }) {
  const __html = parser(R.defaultTo(html, children))

  return React.createElement(
    element,
    {
      ...rest,
      dangerouslySetInnerHTML: { __html }
    }
  )
}

export default InnerHTML