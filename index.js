require('dotenv').config()
// const { pollution } = require('./tasks')
const app = require('./services/server')
const port = process.env.PORT
/* Just for testing with seeds
const { resetDB, populateDb } = require('./__test__/helpers')
resetDB()
populateDb()
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
