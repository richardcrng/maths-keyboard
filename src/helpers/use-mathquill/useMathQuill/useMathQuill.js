import * as R from 'ramda'
import React from 'react';
import MQContext from '../MQ/Context';
import mathquill from '../mathquill';

function useMathQuill() {
  const contextMQ = React.useContext(MQContext)
  if (contextMQ) return contextMQ

  const globalMQ = window.MQ
  if (globalMQ) return globalMQ

  const globalMathQuill = window.MathQuill
  if (R.prop('getInterface', globalMathQuill)) return globalMathQuill.getInterface(2)

  return mathquill(window).getInterface(2)
}

export default useMathQuill;