import React from 'react';
import InnerHTML from '../../../innerHtml/InnerHTML';

function CalculatorInputLabel(props) {
  if (props.label) {
    return (
      <InnerHTML.span
        className="mr-2"
        html={props.label}
      />
    )
  } else {
    return null
  }
}

export default CalculatorInputLabel