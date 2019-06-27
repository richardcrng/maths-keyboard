import _ from 'lodash';
import React from 'react';
import { deviceIsMobile } from '../../../../utils/web/utilsWeb';

function useMathQuillMathFieldKeyListeners(ref, keydown) {
  React.useEffect(() => {
    const domElement = ref.current
    const mathField = window.MathQuill(domElement)
    domElement.addEventListener('keydown', event => writeKeyToMathField({ event, keydown, mathField }))
    return function cleanup() {
      domElement.removeEventListener('keydown', event => writeKeyToMathField({ event, keydown, mathField }))
    }
  })
}

const defaultKeydown = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'x', 'y', 'z', 'e', 'k', 'n',
  '(', ')', '^', '+', '-'
]

const writeKeyToMathField = ({ event, keydown, mathField }) => {
  const { key } = event;
  const keys = Array.isArray(keydown) ? keydown : defaultKeydown
  if (deviceIsMobile() && keydown && _.includes(keys, key)) {
    mathField.write(event.key)
  }
}

export default useMathQuillMathFieldKeyListeners;