import _ from 'lodash'

export const addPropertyAtIndex = (arr, idx, propName, propVal) => (
  _.map(arr, (element, index) => (
    positiveIndex(arr, idx) === index
      ? addProperty(element, propName, propVal)
      : element
  ))
)

export const atIndex = (array, index) => array[positiveIndex(array, index)];

export const deleteAtIndex = (arr, idx) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  ...arr.slice(positiveIndex(arr, idx) + 2)
]

export const insertAtIndex = (arr, idx, newVal, nameProp = "prop", genKeyProp = false) => (
  idx < 0
    ? insertAfterIndex(arr, idx, newVal, nameProp, genKeyProp)
    : insertBeforeIndex(arr, idx, newVal, nameProp, genKeyProp)
)

export const replaceAtIndex = (arr, idx, newVal) =>
  _.map(arr, (value, index) =>
    positiveIndex(arr, idx) === index ? newVal : value
  );

export const takeLast = (n, array) => {
  const { length } = array
  return length <= n ? array : _.slice(array, length - n)
}

const addProperty = (object, propName, propVal) =>
  typeof object === "object"
    ? { ...object, [propName]: propVal }
    : { [propName]: propVal };

const insertAfterIndex = (arr, idx, newVal, nameProp = "prop", genKeyProp = false) => (
  genKeyProp
    ? insertAfterIndexWithKey(arr, idx, newVal, nameProp)
    : insertAfterIndexNoKey(arr, idx, newVal)
)

const insertAfterIndexNoKey = (arr, idx, newVal) => [
  ...arr.slice(0, positiveIndex(arr, idx) + 1),
  newVal,
  ...arr.slice(positiveIndex(arr, idx) + 1)
];

const insertAfterIndexWithKey = (arr, idx, newVal, nameProp) => [
  ...arr.slice(0, positiveIndex(arr, idx) + 1),
  { key: keyGen(), [nameProp]: newVal },
  ...arr.slice(positiveIndex(arr, idx) + 1)
]

const insertBeforeIndex = (arr, idx, newVal, nameProp = "prop", genKeyProp = false) => (
  genKeyProp
    ? insertBeforeIndexWithKey(arr, idx, newVal, nameProp)
    : insertBeforeIndexNoKey(arr, idx, newVal)
)

const insertBeforeIndexNoKey = (arr, idx, newVal) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  newVal,
  ...arr.slice(positiveIndex(arr, idx))
];

const insertBeforeIndexWithKey = (arr, idx, newVal, nameProp) => [
  ...arr.slice(0, positiveIndex(arr, idx)),
  { key: keyGen(), [nameProp]: newVal },
  ...arr.slice(positiveIndex(arr, idx))
]

const keyGen = () => {
  return Math.random().toString(36) + Math.random().toString(36);
};

const positiveIndex = (array, index) =>
  index < 0 ? array.length + parseInt(index) : index;