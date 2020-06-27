const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({
  station: [],
  pollution: [],
  acustic: [],
  pollen: [],
  weather: [],
  flu: {}
}).write()

const entities = ['station', 'pollution', 'acustic', 'pollen', 'weather']
const entitiesHandler = () => {
  const entitiesHandler = {}

  entities.forEach(entity => {
    entitiesHandler[entity] = {
      save: data => db.get(entity).push(data).write(),
      fetchAll: () => db.get(entity).value(),
      fetchById: id => db.get(entity).find({ id }).value()
    }
  })

  return entitiesHandler
}

module.exports = {
  reset: () => {
    entities.forEach(item => db.get(item).remove().write())
    db.set('flu', {}).write()
  },
  flu: {
    save: data => db.get('flu').assign(data).write(),
    fetchDetails: () => db.get('flu').value()
  },
  ...entitiesHandler()

}
