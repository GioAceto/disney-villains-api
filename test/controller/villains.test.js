const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainsBySlug, addNewVillain } = require('../../controllers/villains')
const models = require('../../models')
const { singleTeam, postedTeam, teamsList } = require('../mocks/teams')

chai.use(sinonChai)
const { expect } = chai