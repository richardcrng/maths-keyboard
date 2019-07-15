import React from 'react';
import { CalculatorKeypadContext } from '../CalculatorKeypad';
// import classes from './CalculatorKeypadKeys.module.css';
import CalculatorKeypadKeysItem from './item/CalculatorKeypadKeysItem';

export const CalculatorKeypadKeysContext = React.createContext()
CalculatorKeypadKeysContext.displayName = 'CalculatorKeypadKeysContext'

function CalculatorKeypadKeys(props) {
  const { nRows } = React.useContext(CalculatorKeypadContext)
  const nItems = React.Children.count(props.children)

  const height = pctHeight({
    numer: props.weightedHeight.row,
    denom: props.weightedHeight.total,
    nRows
  })

  return (
    <CalculatorKeypadKeysContext.Provider value={{ nItems, keyStyle: props.keyStyle }}>
      <div className="d-flex justify-content-between" style={{ height, ...props.style }}>
        {props.children}
      </div>
    </CalculatorKeypadKeysContext.Provider>
  )
}

CalculatorKeypadKeys.Item = CalculatorKeypadKeysItem

const calculatePct = ({numer, denom, nRows}) => Math.round(80 * numer/denom)
const pctHeight = ({numer, denom, nRows}) => `${calculatePct({ numer, denom, nRows })}%`

export default CalculatorKeypadKeys;