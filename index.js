require('dotenv').config()
const app = require('./services/server')
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
