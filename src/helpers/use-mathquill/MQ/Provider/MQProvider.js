import React from 'react';
import mathquill from '../../mathquill';
import MQContext from '../Context';

function MQProvider({ children }) {
  const [MQ, setMQ] = React.useState()

  React.useEffect(() => {
    if (!MQ) {
      const MathQuill = mathquill()
      setMQ(MathQuill.getInterface(2))
    }
  }, [MQ, setMQ])

  return (
    <MQContext.Provider value={MQ}>
      { children }
    </MQContext.Provider>
  )
}

export default MQProvider;