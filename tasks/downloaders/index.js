const got = require('got')

const download = url => () => got(url).then(response => response.body)

module.exports = {
  pollution: download('http://www.mambiente.munimadrid.es/opendata/horario.txt')
}
