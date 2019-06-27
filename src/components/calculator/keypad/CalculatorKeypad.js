// Children represent keypad rows

import _ from 'lodash';
import React from 'react';
import classes from './CalculatorKeypad.module.css';
import CalculatorKeypadKeys from './keys/CalculatorKeypadKeys';

export const CalculatorKeypadContext = React.createContext()
CalculatorKeypadContext.displayName = "CalculatorKeypadContext"

function CalculatorKeypad(props) {
  let nRows = 0
  React.Children.forEach(props.children, child => {
    if (!rowIsInvisible(child)) nRows++
  })

  return (
    <CalculatorKeypadContext.Provider value={{ nRows }}>
      <div className={classes.CalculatorKeypad}>
        {props.children}
      </div>
    </CalculatorKeypadContext.Provider>
  )
}

const rowIsInvisible = row => _.get(row, 'props.style.display') === "none"

CalculatorKeypad.Keys = CalculatorKeypadKeys

export default CalculatorKeypad;