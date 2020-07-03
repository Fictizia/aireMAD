const { pollution } = require('../../tasks/downloaders')
const { sources: { pollution: pollutionFixture } } = require('../fixtures')

describe('downloaders behaviour', () => {
  test('pollution downloader', async () => {
    const data = await pollution()
    expect(data).toStrictEqual(pollutionFixture)
  })
})
