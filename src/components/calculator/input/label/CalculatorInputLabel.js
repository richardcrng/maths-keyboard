import React from 'react';
import Maths from '../../../../helpers/react-maths';

function CalculatorInputLabel(props) {
  if (props.label) {
    return (
      <Maths
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