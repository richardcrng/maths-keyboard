import React from 'react';
import { CalculatorBindingContext } from '../binding/CalculatorBinding';

import classes from './CalculatorHeader.module.css';
import InnerHTML from '../../innerHtml/InnerHTML';
import IconExit from '../../icon/exit/IconExit';

function CalculatorHeader(props) {
  const { calculator } = React.useContext(CalculatorBindingContext)

  return (
    <div className={classes.CalculatorHeader}>
      <InnerHTML.p
        className={classes.CalculatorHeaderText}
        html={props.content}
      />
      <IconExit calc onClick={calculator.hide} />
    </div>
  )
}

export default CalculatorHeader;