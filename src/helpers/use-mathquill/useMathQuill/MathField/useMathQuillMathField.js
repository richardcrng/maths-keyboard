import useMathQuillMathFieldInitiate from './Initiate';

function useMathQuillMathField(ref, { focus, latex, keydown } = {}) {
  useMathQuillMathFieldInitiate(ref, { focus, latex })
  // useMathQuillMathFieldKeyListeners(ref, keydown)
}

export default useMathQuillMathField;