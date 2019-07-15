import { MdArrowBack, MdArrowDownward, MdArrowForward, MdArrowUpward, MdSend } from 'react-icons/md';

export const CALCULATOR_LAYOUT_STANDARD = [
  {
    // Invisible non-displayed buttons
    keyStyle: {
      display: "none"
    },
    weightedHeight: 0,
    keys: [
      { text: "delete", keystroke: "MQ-Delete", onKeyDown: "Delete" },
    ]
  },
  {
    keyStyle: {
      color: "#404040",
      backgroundColor: "#c6c6c6",
      border: 0,
      borderRadius: "2px",
    },
    weightedHeight: 0.4,
    keys: [
      { icon: MdArrowBack, keystroke: "MQ-Left", onKeyDown: "ArrowLeft" },
      { icon: MdArrowForward, keystroke: "MQ-Right", onKeyDown: "ArrowRight" },
      { icon: MdArrowUpward, keystroke: "MQ-Up", onKeyDown: "ArrowUp" },
      { icon: MdArrowDownward, keystroke: "MQ-Down", onKeyDown: "ArrowDown" },
    ]
  },
  {
    keyStyle: {
      color: "white",
      backgroundColor: "#2f3031",
      background: "linear-gradient(45deg, #2f3031, #3f4042)",
      border: "1px solid #606060",
      borderRadius: "5px",
    },
    weightedHeight: 0.8,
    keys: [
      // eslint-disable-next-line no-template-curly-in-string
      { latex: "${\\square}^{\\square}$", write: "^{}", keystroke: "MQ-Left", onKeyPress: "^" },
      { latex: "$\\sqrt[\\square]{\\square}$", write: "\\sqrt[]{}", keystroke: "MQ-Left MQ-Left", onKeyPress: "r" },
      { latex: "$e$", write: "e", onKeyPress: "e" },
      { latex: "$x$", write: "x", onKeyPress: "x" },
      { latex: "$y$", write: "y", onKeyPress: "y" },
      { latex: "$z$", write: "z", onKeyPress: "z" }
    ]
  },
  {
    keyStyle: {
      color: "white",
      backgroundColor: "#2f3031",
      background: "linear-gradient(45deg, #2f3031, #3f4042)",
      border: "1px solid #606060",
      borderRadius: "5px",
    },
    weightedHeight: 0.8,
    keys: [
      // eslint-disable-next-line no-template-curly-in-string
      { latex: "${\\square}^{2}$", write: "^{2}" },
      { latex: "$\\sqrt{\\square}$", write: "\\sqrt{}", keystroke: "MQ-Left", onKeyPress: "s" },
      { latex: "$k$", write: "k", onKeyPress: "k" },
      { latex: "$n$", write: "n", onKeyPress: "n" },
      { latex: "$($", write: "(", onKeyPress: "(" },
      { latex: "$)$", write: ")", onKeyPress: ")" }
    ]
  },
  {
    keyStyle: {
      border: "0",
      borderRadius: "5px",
      fontSize: "18px"
    },
    keys: [
      { text: "7", write: "7", onKeyPress: "7" },
      { text: "8", write: "8", onKeyPress: "8" },
      { text: "9", write: "9", onKeyPress: "9" },
      { text: "DEL", style: { backgroundColor: "#5a34b4", color: "white" }, keystroke: "MQ-Backspace", onKeyDown: "Backspace" },
      { text: "AC", style: { backgroundColor: "#5a34b4", color: "white" }, keystroke: "MQ-Ctrl-A MQ-Backspace" }
    ]
  },
  {
    keyStyle: {
      border: "0",
      borderRadius: "5px",
      fontSize: "18px"
    },
    keys: [
      { text: "4", write: "4", onKeyPress: "4" },
      { text: "5", write: "5", onKeyPress: "5" },
      { text: "6", write: "6", onKeyPress: "6" },
      { latex: "$\\times$", write: "\\times", onKeyPress: "*" },
      { latex: "$\\frac{\\square}{\\square}$", write: "\\frac{}{}", keystroke: "MQ-Left MQ-Left", onKeyPress: "/" }
    ]
  },
  {
    keyStyle: {
      border: "0",
      borderRadius: "5px",
      fontSize: "18px"
    },
    keys: [
      { text: "1", write: "1", onKeyPress: "1" },
      { text: "2", write: "2", onKeyPress: "2" },
      { text: "3", write: "3", onKeyPress: "3" },
      { latex: "$+$", write: "+", onKeyPress: "+" },
      { latex: "$-$", write: "-", onKeyPress: "-" }
    ]
  },
  {
    keyStyle: {
      border: "0",
      borderRadius: "5px",
      fontSize: "18px"
    },
    keys: [
      { text: "0", write: "0", onKeyPress: "0" },
      { latex: "$.$", write: ".", onKeyPress: "." },
      { latex: "$,$", write: ",", onKeyPress: "," },
      // { icon: MdKeyboardHide, thenDismiss: true, style: { backgroundColor: "green", color: "white" } },
      { icon: MdSend, thenSubmit: true, thenDismiss: true, style: { backgroundColor: "#3cb878", color: "white" }, onKeyPress: "Enter", weightedWidth: 2 }
    ]
  }
]