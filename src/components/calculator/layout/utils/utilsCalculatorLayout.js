import _ from 'lodash';

import React from 'react';
import CalculatorKeypadKeys from '../../keypad/keys/CalculatorKeypadKeys';
import { parsePartsWithKatex } from '../../../../helpers/utils/katex/utilsKatex';

export const asCalculatorKeypad = arr => {
  const totalWeightedHeight = sumOfWeightedHeights(arr)
  return _.map(arr, row => asCalculatorKeypadKeys(row, totalWeightedHeight))
}

const asCalculatorKeypadKeys = ({ keyStyle, keys, rowStyle, weightedHeight }, totalWeightedHeight) => {
  const totalWeightedWidth = sumOfWeightedWidths(keys)
  return (
    <CalculatorKeypadKeys
      style={rowStyle}
      keyStyle={keyStyle}
      key={identifierFromFirstKey(keys)}
      weightedHeight={{
        row: (weightedHeight == null) ? 1 : weightedHeight,
        total: totalWeightedHeight
      }}
    >
      {_.map(keys, key => asCalculatorKeypadKeysItem(key, totalWeightedWidth))}
    </CalculatorKeypadKeys>
  )
}

const asCalculatorKeypadKeysItem = (keyObj, totalWeightedWidth) => {
  const {
    // Keypad key text
    latex,
    text,
    icon: Icon,

    // Key functionality + visuals:
    //    -> write
    //    -> keystroke
    //    -> style
    //    -> thenSubmit
    //    -> thenDismiss
    ...rest
  } = keyObj;

  const weightedWidth = {
    key: (keyObj.weightedWidth == null) ? 1 : keyObj.weightedWidth,
    total: totalWeightedWidth
  }

  rest.weightedWidth = weightedWidth

  if (latex) {
    return <CalculatorKeypadKeys.Item html={parsePartsWithKatex(latex)} key={latex} {...rest} />
  } else if (Icon) {
    return <CalculatorKeypadKeys.Item render={() => <Icon size={25} />} key={Icon} {...rest} />
  } else if (text) {
    return <CalculatorKeypadKeys.Item content={text} key={text} {...rest} />
  } else {
    return null
  }
}

const identifierFromFirstKey = keys => (
  keys[0].latex || keys[0].icon || keys[0].text
)

const incrementAccWithRowHeight = (acc, row) => {
  const toAdd = typeof row.weightedHeight !== "undefined"
    ? row.weightedHeight
    : _.get(row, 'style.display') === "none" ? 0 : 1
  return acc + toAdd
}

const incrementAccWithKeyWidth = (acc, key) => {
  const toAdd = typeof key.weightedWidth !== "undefined"
    ? key.weightedWidth
    : 1
  return acc + toAdd
}

const sumOfWeightedHeights = arr => _.reduce(
  arr,
  incrementAccWithRowHeight,
  0
)

const sumOfWeightedWidths = arr => _.reduce(
  arr,
  incrementAccWithKeyWidth,
  0
)