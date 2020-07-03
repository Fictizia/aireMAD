const { pollution } = require('../../tasks/validators')
const { sources: { pollution: pollutionFixture } } = require('../fixtures')

describe('validators behaviour', () => {
  test('pollution validation', async () => {
    const rows = await pollution(pollutionFixture)
    expect(rows.length).toStrictEqual(146)
    rows.forEach(row => {
      expect(row.length).toStrictEqual(57)
    })
    expect(rows).toMatchSnapshot()
  })
})
