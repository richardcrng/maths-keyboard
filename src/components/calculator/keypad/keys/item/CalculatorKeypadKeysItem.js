import _ from 'lodash';
import React from 'react';
import { CalculatorKeypadKeysContext } from '../CalculatorKeypadKeys';
import classes from './CalculatorKeypadKeysItem.module.css';
import InnerHTMLspan from '../../../../innerHtml/span/InnerHTMLspan';
import { CalculatorContext } from '../../../Calculator';
import { CalculatorBindingContext } from '../../../binding/CalculatorBinding';
import { pctWidth, updateMathFields, postUpdateEffects } from './utils';

function CalculatorKeypadKeysItem(props) {
  const { calculator } = React.useContext(CalculatorBindingContext)
  const { displayRef, inputRef, onHide } = React.useContext(CalculatorContext)
  const { keyStyle: styleFromRow } = React.useContext(CalculatorKeypadKeysContext)
  const { write, keystroke, thenSubmit, thenDismiss, onKeyDown, onKeyPress, style: itemStyle } = props;
  const ToRender = props.render

  const handleKeyInput = () => {
    const displayMathField = window.MathQuill(displayRef.current)
    const inputMathField = window.MathQuill(_.get(inputRef, 'current'))
    updateMathFields({ displayMathField, inputMathField, write, keystroke })
    postUpdateEffects({ calculator, displayMathField, inputRef, onHide, thenDismiss, thenSubmit })
  }

  const makeHandler = keyboardEventKey => event => {
    if (keyboardEventKey && event.key === keyboardEventKey) handleKeyInput()
  }

  const memoisedHandler = React.useCallback(makeHandler, [handleKeyInput])

  React.useEffect(() => {
    const handleKeyDown = memoisedHandler(onKeyDown)
    const handleKeyPress = memoisedHandler(onKeyPress)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keypress', handleKeyPress)
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [displayRef, inputRef, onKeyDown, onKeyPress, memoisedHandler])

  return (
    <button
      className={classes.CalculatorKeypadKeysItem}
      style={{
        width: pctWidth({ numer: props.weightedWidth.key, denom: props.weightedWidth.total }), ...styleFromRow,
        ...itemStyle
      }}
      disabled={props.disabled}
      onClick={handleKeyInput}
    >
      <span className={classes.CalculatorKeypadKeysItemContent}>
        {props.content}
        {props.html && <InnerHTMLspan html={props.html} />}
        {ToRender && <ToRender />}
      </span>
    </button>
  )
}

export default CalculatorKeypadKeysItem;