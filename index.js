const villains = require('./villains')
const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainsBySlug } = require('./controllers/villains')

const app = express()
const PORT = 1337

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainsBySlug)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
