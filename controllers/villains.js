const models = require('../models')

const getAllVillains = async (req, res) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return res.send(villains)
}

const getVillainsBySlug = async (req, res) => {
  const { slug } = req.params

  const result = await models.villains.findOne({ where: { slug }, attributes: ['name', 'movie', 'slug'] })

  return result
    ? res.send(result) : res.sendStatus(404)
}

const addNewVillain = () => {

}

module.exports = { getAllVillains, getVillainsBySlug, addNewVillain }
