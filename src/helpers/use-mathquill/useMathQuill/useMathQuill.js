import React from 'react';
import MQContext from '../MQ/Context';

function useMathQuill() {
  const contextMQ = React.useContext(MQContext)
  const globalMQ = window.MQ
  const globalMathQuill = window.MathQuill

  return contextMQ || globalMQ || globalMathQuill
}

export default useMathQuill;