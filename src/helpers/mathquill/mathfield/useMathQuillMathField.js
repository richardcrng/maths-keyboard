import useMathQuillMathFieldInitiate from './initiate/useMathQuillMathFieldInitiate';
// import useMathQuillMathFieldKeyListeners from './keyListeners/useMathQuillMathFieldKeyListeners';

function useMathQuillMathField(ref, { focus, latex, keydown } = {}) {
  useMathQuillMathFieldInitiate(ref, { focus, latex })
  // useMathQuillMathFieldKeyListeners(ref, keydown)
}

export default useMathQuillMathField;