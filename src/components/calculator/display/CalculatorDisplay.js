import React from 'react';
import classes from './CalculatorDisplay.module.css';
import CalculatorDisplayMaths from './maths/CalculatorDisplayMaths';

function CalculatorDisplay(props, ref) {
  return (
    <div className={`container ${classes.CalculatorDisplay}`}>
      <div className={classes.CalculatorDisplayContent}>
        <CalculatorDisplayMaths ref={ref} />
      </div>
    </div>
  )
}

//eslint-disable-next-line no-func-assign
CalculatorDisplay = React.forwardRef(CalculatorDisplay)
CalculatorDisplay.displayName = "CalculatorDisplay"

export default CalculatorDisplay;