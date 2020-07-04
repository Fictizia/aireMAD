const { chunk } = require('../helpers')

describe('chunk behaviour', () => {
  test('chunk should work as expected', () => {
    const sampleArray = [1, 2, 3, 4, 5]

    expect(chunk(sampleArray, 1)).toStrictEqual([[1], [2], [3], [4], [5]])
    expect(chunk(sampleArray, 2)).toStrictEqual([[1, 2], [3, 4], [5]])
    expect(chunk(sampleArray, 4)).toStrictEqual([[1, 2, 3, 4], [5]])
    expect(chunk(sampleArray)).toStrictEqual([[1], [2], [3], [4], [5]])
  })
})
