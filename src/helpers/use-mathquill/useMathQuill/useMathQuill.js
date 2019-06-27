import React from 'react';
import MQContext from '../MQ/Context';

function useMathQuill() {
  const contextMQ = React.useContext(MQContext)
  if (contextMQ) return contextMQ

  const globalMQ = window.MQ
  if (globalMQ) return globalMQ

  const globalMathQuill = window.MathQuill.getInterface(2)
  if (globalMathQuill) return globalMathQuill

  return null
}

export default useMathQuill;