import React from 'react';
import InnerHTML from '../InnerHTML';
import parseWithKatex from '../parseWithKatex';

function Maths({ children, element = "div" }) {
  return (
    <InnerHTML element={element} parser={parseWithKatex}>
      {children}
    </InnerHTML>
  )
}

export default Maths;