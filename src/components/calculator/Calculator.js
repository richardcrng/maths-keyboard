import _ from 'lodash';
import React from 'react';
import CalculatorDisplay from './display/CalculatorDisplay';
import classes from './Calculator.module.css';
import CalculatorKeypad from './keypad/CalculatorKeypad';
import { CALCULATOR_LAYOUT_STANDARD } from './layout/standard/CalculatorLayoutStandard';
import { asCalculatorKeypad } from './layout/utils/utilsCalculatorLayout';
import CalculatorInput from './input/CalculatorInput';
import { CalculatorBindingContext } from './binding/CalculatorBinding';
import useMathQuill from '../../helpers/use-mathquill';

export const CalculatorContext = React.createContext()
CalculatorContext.displayName = "CalculatorContext"

function Calculator(props) {
  const MQ = useMathQuill()

  const binding = React.useContext(CalculatorBindingContext)
  const createdRef = React.useRef()
  const displayRef = _.get(binding, 'calculator.displayRef', props.displayRef || createdRef)

  
  // Update calculator binding's knowledge of
  //   whether the calculator is showing
  const { calculator: { showing, setShowing } } = binding;
  React.useEffect(() => {
    if (showing !== props.when) {
      setShowing(props.when)
    }
  }, [props.when, showing, setShowing])

  // Clear when inputRefs array updates
  React.useEffect(() => {
    const mathField = MQ(displayRef.current)
    if (mathField) mathField.latex('')
  }, [binding.inputRefs.array]) // eslint-disable-line react-hooks/exhaustive-deps

  const { inputRef, onHide } = props;

  return (
    <div className={className(props)} style={props.style}>
      <CalculatorContext.Provider
        value={{ displayRef, inputRef, onHide, showing: props.when }}
      >
        <CalculatorDisplay ref={displayRef} latex={props.latex} />
        <CalculatorKeypad>
          {asCalculatorKeypad(props.layout || CALCULATOR_LAYOUT_STANDARD)}
        </CalculatorKeypad>
      </CalculatorContext.Provider>
    </div>
  )
}

const className = props => {
  const arr = [classes.Calculator]
  props.when ? arr.push(classes.CalculatorShow) : arr.push(classes.CalculatorHide);
  return arr.join(' ')
}

Calculator.Display = CalculatorDisplay
Calculator.Input = CalculatorInput
Calculator.Keypad = CalculatorKeypad

export default Calculator;