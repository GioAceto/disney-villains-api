const models = require('../models')

const getAllVillains = async (req, res) => {
  const villains = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

  return res.send(villains)
}

const getVillainsBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const result = await models.villains.findOne({ where: { slug }, attributes: ['name', 'movie', 'slug'] })

    return result
      ? res.send(result) : res.sendStatus(404)
  } catch (error) {
    return res.status(500).send('HTTP Error 500 unable to handle this request')
  }
}

const addNewVillain = async (req, res) => {
  try {
    const { name, movie, slug } = req.body

    if (!name || !movie || !slug) {
      return res.send('All fields are required')
    }

    const newVillain = await models.villains.create({ name, movie, slug })

    return res.status(201).send(newVillain)
  } catch (error) {
    return res.status(500).send('HTTP Error 500 unable to handle this request')
  }
}

module.exports = { getAllVillains, getVillainsBySlug, addNewVillain }
