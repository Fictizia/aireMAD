// @see: https://stackoverflow.com/a/50766024
const chunk = (arr, size = 1) =>
  arr
    .reduce((acc, _, i) =>
      (i % size)
        ? acc
        : [...acc, arr.slice(i, i + size)]
    , [])

module.exports = { chunk }
