const { sources } = require('../__test__/fixtures/index')

module.exports = async () => {
  return Promise.resolve({
    body: sources.pollution
  })
}
