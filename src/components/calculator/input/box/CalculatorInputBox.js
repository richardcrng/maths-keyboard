import React from 'react';
import useMathQuillMathField from '../../../../helpers/hooks/mathquill/mathfield/useMathQuillMathField';

function CalculatorInputBox(props, ref) {
  const createdRef = React.useRef()
  const inputRef = ref || createdRef
  useMathQuillMathField(inputRef)

  const id = props.id.split('-')[1]

  return (
    <span
      id={`CalculatorInputBox-${id}`}
      ref={inputRef}
      onClick={props.onFocus}
      onFocus={props.onFocus}
      style={{ minWidth: "20px" }}
    />
  )
}

// eslint-disable-next-line no-func-assign
CalculatorInputBox = React.forwardRef(CalculatorInputBox)
CalculatorInputBox.displayName = "CalculatorInputBox"

export default CalculatorInputBox;