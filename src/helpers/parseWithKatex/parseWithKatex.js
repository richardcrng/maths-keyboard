import { parsePartsWithKatex, parseWholeWithKatex } from "./utils";

const parseWithKatex = (string, parseInParts = true) => parseInParts
  ? parsePartsWithKatex(string)
  : parseWholeWithKatex(string)

export default parseWithKatex