const fixture = require('../fixtures')
const store = require('../../services/store')

module.exports = {
  resetDB: store.reset,
  populateDb: () => {
    const entities = ['station', 'pollution', 'acustic', 'pollen', 'weather']

    entities.forEach(entity => {
      fixture[entity].allStations.forEach(item => store[entity].save(item))
    })

    // flu
    store.flu.save(fixture.flu)
  }
}
