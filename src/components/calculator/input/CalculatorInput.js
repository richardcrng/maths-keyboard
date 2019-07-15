import _ from 'lodash';
import React from 'react';
import CalculatorInputLabel from './label/CalculatorInputLabel';
import CalculatorInputBox from './box/CalculatorInputBox';
import { executeIfFunction } from '../../../helpers/utils/component/utilsComponent';
import { CalculatorBindingContext } from '../binding/CalculatorBinding';

function CalculatorInput(props) {
  const randId = React.useState(Math.ceil(Math.random() * 1000))
  const binding = React.useContext(CalculatorBindingContext) || {}
  const createdRef = React.useRef()
  const inputRef = props.inputRef || createdRef

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
    if (binding.calculator.onChange !== props.onChange && props.onChange) {
      binding.calculator.setOnChange(() => props.onChange)
    }
    if (binding.calculator.onSubmit !== props.onSubmit && props.onSubmit) {
      binding.calculator.setOnSubmit(() => props.onSubmit)
    }
  })

  const handleFocus = () => {
    executeIfFunction(props.onFocus)
    executeIfFunction(binding.inputRefs.onFocus)
    executeIfFunction(binding.inputRefs.activate, inputRef)
    executeIfFunction(binding.calculator.setHeader, label)
  }

  const id = props.id ? props.id.split('-')[1] : randId

  return (
    <div className={props.className} style={props.style}>
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