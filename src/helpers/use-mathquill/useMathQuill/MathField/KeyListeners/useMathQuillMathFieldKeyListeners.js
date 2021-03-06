import _ from 'lodash';
import React from 'react';
import useMathQuill from '../../useMathQuill';

function useMathQuillMathFieldKeyListeners(ref, keydown) {
  const MQ = useMathQuill()

  React.useEffect(() => {
    const domElement = ref.current
    const mathField = MQ(domElement)
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
  if (keydown && _.includes(keys, key)) {
    mathField.write(event.key)
  }
}

export default useMathQuillMathFieldKeyListeners;