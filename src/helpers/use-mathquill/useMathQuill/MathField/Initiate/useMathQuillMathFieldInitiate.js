import $ from 'jquery';
import useExecute from '../../../../useExecute';
import useMathQuill from '../../useMathQuill';

function useMathQuillMathFieldInitiate(ref, { focus, latex } = {}) {
  const MQ = useMathQuill()

  // On first render:
  //   1. Convert ref's current element to a MathQuill MathField
  //   2. Fill in latex if given
  //   3. Focus on the MathField if required

  useExecute(() => {
    const mathField = transformElementIntoMathField(MQ, ref);
    if (latex) mathField.latex(latex)
    if (focus) mathField.focus()
  }, [])
}

const transformElementIntoMathField = (MQ, ref) => {
  const config = {}
  // const makeNonFocusable = deviceIsMobile()
  const makeNonFocusable = true
  if (makeNonFocusable) {
    // Makes it non-focusable by user to stop mobile keyboard
    config.substituteTextarea = () => $('<span id="MATHFIELD" tabindex=0></span>')[0]
  }
  return MQ.MathField(ref.current, config)
}

export default useMathQuillMathFieldInitiate;