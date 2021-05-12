const villains = require('./villains')
const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainsBySlug, addNewVillain } = require('./controllers/villains')

const app = express()
const PORT = 1337

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainsBySlug)

app.post('/villains', bodyParser.json(), addNewVillain)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
