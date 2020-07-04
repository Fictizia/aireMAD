const { pollution } = require('../../tasks')
const store = require('../../services/store')

beforeEach(() => {
  store.reset()
})

afterEach(() => {
  store.reset()
})

describe('pollution task behaviour', () => {
  test('Pollution data should be downloaded and processed', async () => {
    expect(store.pollution.fetchAll()).toStrictEqual([])
    await pollution()
    expect(store.pollution.fetchAll()).not.toStrictEqual([])
    expect(store.pollution.fetchAll()).toMatchSnapshot()
  })
})
