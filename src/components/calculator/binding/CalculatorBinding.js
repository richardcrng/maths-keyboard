import _ from 'lodash';
import React from 'react';
import Calculator from '../Calculator';

export const CalculatorBindingContext = React.createContext()

function CalculatorBinding(props) {
  const [arrOfInputRefs, setArrOfInputRefs] = React.useState([]);
  const [activeInputRef, setActiveInputRef] = React.useState();
  const [calculatorHeader, setCalculatorHeader] = React.useState();
  const calculatorDisplayRef = React.useRef();
  const [calculatorShowing, setCalculatorShowing] = React.useState(false);

  const [onChange, setOnChange] = React.useState(() => props.onChange);
  // const [onDisplayFocus, setOnDisplayFocus] = React.useState(props.onDisplayFocus);
  // const [onInputFocus, setOnInputFocus] = React.useState(props.onInputFocus);
  const [onSubmit, setOnSubmit] = React.useState(() => props.onSubmit);

  React.useEffect(() => {
    if (!onChange && props.onChange) setOnChange(() => props.onChange)
    if (!onSubmit && props.onSubmit) setOnSubmit(() => props.onSubmit)
  }, [onChange, props.onChange, onSubmit, props.onSubmit])

  const deactivateInputRefs = makeDeactivateHandler({ activeInputRef, setActiveInputRef })
  const activateInputRef = makeActivateHandler({ activeInputRef, arrOfInputRefs, calculatorDisplayRef, deactivateInputRefs, setActiveInputRef })

  const inputRefs = {
    activate: activateInputRef,
    active: activeInputRef,
    array: arrOfInputRefs,
    deactivate: deactivateInputRefs,
    clear: () => { setArrOfInputRefs([]); setActiveInputRef() },
    onFocus: props.onInputFocus,
    // inputRefs.push() also clears deadwood of unassigned refs
    push: ref => setArrOfInputRefs(_.filter([...arrOfInputRefs, ref], input => input.current)),
  }

  const calculator = {
    // clear: () => window.MathQuill(calculatorDisplayRef.current).latex(''),
    displayRef: calculatorDisplayRef,
    header: calculatorHeader,
    hide: props.handleCalculatorHide,
    onChange,
    onSubmit: () => {
      if (props.active) onSubmit()
    },
    setHeader: setCalculatorHeader,
    setOnChange,
    setOnSubmit,
    showing: calculatorShowing,
    setShowing: setCalculatorShowing
  }

  const whenFunction = _.get(props, 'when.function', ({ inputRefs }) => !!inputRefs.active)
  const kwargs = _.get(props, 'when.params', {})
  const show = typeof props.when === "boolean"
    ? props.when
    : whenFunction({ inputRefs, calculator, ...kwargs })

  return (
    <CalculatorBindingContext.Provider value={{ inputRefs, calculator }}>
      {props.children}
      <Calculator
        displayRef={calculator.displayRef}
        header={calculator.header}
        inputRef={inputRefs.active}
        onHide={() => {
          props.handleCalculatorHide()
          inputRefs.deactivate(inputRefs.active)
        }}
        style={props.style}
        when={show}
      />
    </CalculatorBindingContext.Provider>
  )
}

const makeActivateHandler = ({ activeInputRef, arrOfInputRefs, calculatorDisplayRef, deactivateInputRefs, setActiveInputRef }) => {
  return refToActivate => {
    deactivateInputRefs(...arrOfInputRefs)
    setActiveInputRef(refToActivate)
    const activeMathField = window.MathQuill(_.get(refToActivate, 'current'))
    activeMathField.blur()
    const calculatorMathField = window.MathQuill(_.get(calculatorDisplayRef, 'current'))
    if (calculatorMathField) {
      // Update calculator display if active refToActivate is changing
      if (activeInputRef !== refToActivate) calculatorMathField.latex(activeMathField.latex())
      calculatorMathField.focus()
    }
  }
}

const makeDeactivateHandler = ({ activeInputRef, setActiveInputRef }) => {
  return (...refs) => {
    refs.forEach(ref => {
      const inputMathField = window.MathQuill(_.get(ref, 'current'))
      if (inputMathField) inputMathField.blur()
      if (activeInputRef === ref) setActiveInputRef()
    })
  }
}

export default CalculatorBinding;