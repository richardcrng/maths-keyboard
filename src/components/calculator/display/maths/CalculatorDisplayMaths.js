import _ from 'lodash';
import React from 'react';
import { CalculatorContext } from '../../Calculator';
import { useMathQuillMathField } from '../../../../helpers/use-mathquill';

function CalculatorDisplayMaths(props, ref) {
  const { inputRef } = React.useContext(CalculatorContext)
  useMathQuillMathField(ref, {
    focus: true,
    latex: _.get(inputRef, 'current') ? window.MathQuill(inputRef.current).latex() : null
  })

  return (
    <span ref={ref} />
  )
}

// eslint-disable-next-line no-func-assign
CalculatorDisplayMaths = React.forwardRef(CalculatorDisplayMaths)
CalculatorDisplayMaths.displayName = "CalculatorDisplayMaths"

export default CalculatorDisplayMaths;