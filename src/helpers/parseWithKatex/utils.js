import _ from 'lodash'
import katex from 'katex'

export const parsePartsWithKatex = string => processText(string, '$type').join('')

export const parseWholeWithKatex = string => {
  const standardParseResult = standardKatexParse(string)
  return customKatexGsubs(standardParseResult)
}

const SHOULD_SPLIT_HERE = "SHOULD_SPLIT_HERE"

const regExp$ = /\$[\S\s]*?\$/g
const regExp$$ = /\$\$[\S\s]*?\$\$/g

const customKatexGsubs = string => {
  return string.replace(//g, '/')
}

const findAndSubstituteInArray = (array, expression, transformation, delimiter = SHOULD_SPLIT_HERE) => {
  const splitArray = splitAndFlattenArrayByExpression(array, expression, delimiter)
  return substituteIntoArray(expression, splitArray, transformation)
}

const katexify = string => {
  try {
    return katex.renderToString(string)
  }
  catch (err) {
    console.log(err, "Failed to katexify", string)
  }
}

const matchedExp = (text = '', regExp) => (
  Array.isArray(text)
    ? text.join('').match(regExp)
    : text ? text.match(regExp) : ''
)

const matchedExp$Not$$ = text => {
  const matches = matchedExp(text, regExp$)
  return matches ? matches.filter(string => string !== "$$") : '';
}

const matchFunction = {
  $type: text => matchedExp$Not$$(text),
}

const prepareStringForSplit = (string, expression, delimiter = SHOULD_SPLIT_HERE) => (
  string.replace(expression, replacementString(expression, delimiter))
)

const prepareAndSplitString = (string, expression, delimiter) => (
  prepareStringForSplit(string, expression, delimiter).split(delimiter)
)

const prepareAndSplitIfString = (element, expression, delimiter) => (
  typeof element === "string" ? prepareAndSplitString(element, expression, delimiter) : element
)

const processText = (text, ...matchTypes) => (
  _.reduce(
    matchTypes,
    (acc, val) => {
      const parser = matchFunction[val]
      return processTextUsingMatchType(acc, parser, parseWholeWithKatex)
    },
    text
  )
)

const processTextUsingMatchType = (text, matchType, renderFunction) => (
  _.reduce(
    matchType(text),
    (accArr, expression) => findAndSubstituteInArray(accArr, expression, renderFunction),
    _.flattenDeep([text])
  )
)

const replacementString = (string, delimiter) => {
  const arr = [delimiter, string, delimiter]
  const joiner = _.startsWith(string, '$$') ? '$' : ''
  return arr.join(joiner)
}

const splitAndFlattenArrayByExpression = (array, expression, delimiter) => (
  _.flattenDeep(array.map(str => prepareAndSplitIfString(str, expression, delimiter)))
)

const standardKatexParse = string => {
  if (string.match(regExp$) || string.match(regExp$$)) {
    return katexify(string.replace(/\$/g, ''))
  } else if (string.match(regExpLatexEnv)) {
    return katexify(string)
  } else {
    return string
  }
}

const substituteIntoArray = (expression, array, transformation) => (
  array.map(str => str === expression ? transformation(str) : str)
)