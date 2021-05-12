const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disneyVillains', 'villains', 'passwordvillains123',
  { host: 'localhost', dialect: 'mysql' })

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
