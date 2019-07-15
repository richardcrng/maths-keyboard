import _ from 'lodash';
import { atIndex } from '../../../../../helpers/array-utils';
import { executeIfFunction } from '../../../../../helpers/component-utils';

export const postUpdateEffects = ({ calculator, displayMathField, inputRef, onHide, thenDismiss, thenSubmit }) => {
  if (thenSubmit && calculator.showing) {
    executeIfFunction(calculator.onSubmit)
  }
  if (thenDismiss) return executeIfFunction(onHide)
  executeIfFunction(calculator.onChange, {
    value: displayMathField.latex(),
    id: takeRelevantIdFor(_.get(inputRef, 'current'))
  })
}

export const updateMathFields = ({ displayMathField, inputMathField, write, keystroke }) => {
  if (write) applyIfDefined({ displayMathField, inputMathField, write })
  if (keystroke) applyIfDefined({ displayMathField, inputMathField, keystroke })
}

export const pctWidth = ({ numer, denom }) => `${calculatePct({ numer, denom })}%`

const applyIfDefined = ({ displayMathField, inputMathField, write, keystroke } = {}) => {
  if (write) displayMathField.write(write)
  if (keystroke) displayMathField.keystroke(keystroke)
  // Update inputMathField if exists, but re-focus on displayMathField
  if (inputMathField) {
    inputMathField.latex(displayMathField.latex())
    inputMathField.blur()
    displayMathField.focus()
  }
}

const calculatePct = ({ numer, denom }) => {
  const widthAdjuster = (numer-1) * 20/(denom-1)
  return Math.round(80 * numer / denom) + widthAdjuster
}

// e.g. grab '7231' from 'CalculatorInput-7231'
const takeRelevantIdFor = element => (
  _.get(element, 'id') ? atIndex(element.id.split('-'), -1) : ''
)
