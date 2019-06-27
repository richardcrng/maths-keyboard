import useMathQuillMathFieldInitiate from './Initiate';

/**
 *
 * @param {React.Ref} ref - React ref for targeted HTML element to initiate MathField at
 * @param {Object} config
 * @param {Boolean} [config.focus = false] - If true, focuses on MathField after initiating
 * @param {String} [config.latex] - Latex string to initiate MathField with
 */
function useMathQuillMathField(ref, { focus, latex, keydown } = {}) {
  useMathQuillMathFieldInitiate(ref, { focus, latex })
  // useMathQuillMathFieldKeyListeners(ref, keydown)
}

export default useMathQuillMathField;