import React from 'react';
import MQContext from '../MQ/Context';
import mathquill from '../mathquill';

function useMathQuill() {
  const contextMQ = React.useContext(MQContext)
  if (contextMQ) return contextMQ

  const globalMQ = window.MQ
  if (globalMQ) return globalMQ

  const globalMathQuill = window.MathQuill.getInterface(2)
  if (globalMathQuill) return globalMathQuill

  return mathquill().getInterface(2)
}

export default useMathQuill;