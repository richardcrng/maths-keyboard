import _ from 'lodash';
import React from 'react';
import CalculatorHeader from './header/CalculatorHeader';
import CalculatorDisplay from './display/CalculatorDisplay';
import classes from './Calculator.module.css';
import CalculatorKeypad from './keypad/CalculatorKeypad';
import { CALCULATOR_LAYOUT_STANDARD } from './layout/standard/CalculatorLayoutStandard';
import { asCalculatorKeypad } from './layout/utils/utilsCalculatorLayout';
import CalculatorInput from './input/CalculatorInput';
import useSetWindow from '../../helpers/hooks/setWindow/useSetWindow';
import useDeviceInfo from '../../helpers/hooks/deviceInfo/useDeviceInfo';
import { CalculatorBindingContext } from './binding/CalculatorBinding';

export const CalculatorContext = React.createContext()
CalculatorContext.displayName = "CalculatorContext"

function Calculator(props) {
  const binding = React.useContext(CalculatorBindingContext)
  const createdRef = React.useRef()
  const displayRef = _.get(binding, 'calculator.displayRef', props.displayRef || createdRef)

  const { mobile } = useDeviceInfo()
  const setWindow = useSetWindow()
  
  // Update calculator binding's knowledge of
  //   whether the calculator is showing
  const { calculator: { showing, setShowing } } = binding;
  React.useEffect(() => {
    if (showing !== props.when) {
      setShowing(props.when)
    }
  }, [props.when, showing, setShowing])
  
  // Set window as fullscreen when on mobile and showing
  React.useEffect(() => {
    if (mobile && props.when) {
      setWindow.orientation('fullscreen', 'portrait')
    }
  }, [mobile, props.when, setWindow])

  // Clear when inputRefs array updates
  React.useEffect(() => {
    const mathField = window.MathQuill(displayRef.current)
    if (mathField) mathField.latex('')
  }, [binding.inputRefs.array]) // eslint-disable-line react-hooks/exhaustive-deps

  const { inputRef, onHide } = props;

  return (
    <div className={className(props)} style={props.style}>
      <CalculatorContext.Provider
        value={{ displayRef, inputRef, onHide, showing: props.when }}
      >
        <CalculatorHeader content={props.header} />
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
Calculator.Header = CalculatorHeader
Calculator.Input = CalculatorInput
Calculator.Keypad = CalculatorKeypad

export default Calculator;