const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainsBySlug, addNewVillain } = require('../../controllers/villains')
const models = require('../../models')
const { singleVillain, postedVillain, villainsList } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Villains', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('Get Villains by Slug', () => {
    it('get a single villain from the DB with the provided ID', async () => {
      stubbedFindOne.returns(singleVillain)
      const req = { params: { name: 'Captain Hook', movie: 'Peter Pan', slug: 'captain-hook' } }
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getVillainsBySlug(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: 'Captain Hook',
          movie: 'Peter Pan',
          slug: 'captain-hook'
        }
      })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
})
