import _ from 'lodash';
import React from 'react';
import CalculatorInputLabel from './label/CalculatorInputLabel';
import CalculatorInputBox from './box/CalculatorInputBox';
import { CalculatorBindingContext } from '../binding/CalculatorBinding';
import { executeIfFunction } from '../../../helpers/component-utils';

function CalculatorInput({ className, id: passedId, inputRef: passedInputRef, label, onChange, onFocus, onSubmit, style }) {
  const randId = React.useState(Math.ceil(Math.random() * 1000))
  const binding = React.useContext(CalculatorBindingContext) || {}
  const createdRef = React.useRef()
  const inputRef = passedInputRef || createdRef

  // Add instance's inputRef to the array in CalculatorBindingContext
  //    if it is missing - this should run every time
  React.useEffect(() => {
    if (inputRef && inputRef.current && !_.includes(_.get(binding, 'inputRefs.array'), inputRef)) {
      binding.inputRefs.push(inputRef)
    }
  })

  // Set as active in CalculatorBindingContext if no other inputRefs exist
  React.useEffect(() => {
    const numAssignedRefs = _.size(_.filter(binding.inputRefs.array, ref => ref.current))
    if (numAssignedRefs === 1 && inputRef.current && _.includes(binding.inputRefs.array, inputRef)) {
      binding.inputRefs.activate(inputRef)
    }
  })

  // Update CalculatorBinding's onChange and onSubmit methods
  React.useEffect(() => {
    if (binding.calculator.onChange !== onChange && onChange) {
      binding.calculator.setOnChange(() => onChange)
    }
    if (binding.calculator.onSubmit !== onSubmit && onSubmit) {
      binding.calculator.setOnSubmit(() => onSubmit)
    }
  })

  const handleFocus = () => {
    executeIfFunction(onFocus)
    executeIfFunction(binding.inputRefs.onFocus)
    executeIfFunction(binding.inputRefs.activate, inputRef)
    executeIfFunction(binding.calculator.setHeader, label)
  }

  const id = passedId ? passedId.split('-')[1] : randId

  return (
    <div className={className} style={style}>
      <CalculatorInputLabel label={label} />
      <CalculatorInputBox
        header={label}
        id={`CalculatorInput-${id}`}
        onFocus={handleFocus}
        ref={inputRef}
      />
    </div>
  )
}

export default CalculatorInput;