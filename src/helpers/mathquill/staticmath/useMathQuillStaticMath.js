import React from 'react';
import $ from 'jquery';

// Renders static math using
//   MathQuill at ref's current HTML element 

function useMathQuillStaticMath(ref, { latex } = {}) {
    // On first render:
  //   1. Convert ref's current element to a MathQuill StaticMath
  //   2. Fill in latex if given

  React.useEffect(() => {
    const staticMath = window.MathQuill.StaticMath(ref.current, [])
    if (latex) staticMath.latex(latex)
  })
}

export default useMathQuillStaticMath;