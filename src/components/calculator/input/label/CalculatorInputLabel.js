import React from 'react';
import InnerHTML from '../../../../helpers/react-maths/InnerHTML';

function CalculatorInputLabel(props) {
  if (props.label) {
    return (
      <InnerHTML
        element='span'
        className="mr-2"
        html={props.label}
      />
    )
  } else {
    return null
  }
}

export default CalculatorInputLabel