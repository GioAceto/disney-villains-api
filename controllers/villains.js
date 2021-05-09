const models = require('../models')

const getAllVillains = async (req, res) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return res.send(villains)
}

const getVillainsBySlug = async (req, res) => {

}

module.exports = { getAllVillains, getVillainsBySlug }
