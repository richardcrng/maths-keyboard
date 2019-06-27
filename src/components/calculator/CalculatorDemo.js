import React from 'react';
import CalculatorInput from './input/CalculatorInput';
import CalculatorBinding from './binding/CalculatorBinding';

function CalculatorDemo(props) {
  return (
    <CalculatorBinding onChange={(...args) => console.log("Handling a change", args)} onSubmit={(...args) => console.log("Handling a submit", args)} >
      <div><CalculatorInput label="$x^2 =$" calculator={{ show: false }} /></div>
      <CalculatorInput
        label="Factorise $y^{3} - y$"
        calculator={{
          show: false,
          style: { position: "fixed", top: "0px", left: "0px" }
        }}
      />
    </CalculatorBinding>
  )
}

export default CalculatorDemo;