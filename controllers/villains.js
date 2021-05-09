const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return response.send(villains)
}

module.exports = { getAllVillains }
