import React from 'react';
import './App.css';
import CalculatorBinding from './components/calculator/binding/CalculatorBinding';
import CalculatorInput from './components/calculator/input/CalculatorInput';

function App() {
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
  );
}

export default App;
