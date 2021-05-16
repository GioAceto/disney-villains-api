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
      const req = { params: { slug: 'captain-hook' } }
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getVillainsBySlug(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          slug: 'captain-hook'
        },
        attributes: ['name', 'movie', 'slug']
      })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 status when no matching id is found', async () => {
      stubbedFindOne.returns(null)
      const req = {
        params: {
          where: {
            slug: 'captain-hook'
          },
          attributes: ['name', 'movie', 'slug']
        }
      }
      const stubbedSend = sinon.stub()
      const res = { sendStatus: stubbedSend }

      await getVillainsBySlug(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          slug: 'captain-hook'
        },
        attributes: ['name', 'movie', 'slug']
      })
      expect(stubbedSend).to.have.been.calledWith(404)
    })
    it('returns a 500 error when the server fails', async () => {
      stubbedFindOne.throws('ERROR')
      const req = { params: { slug: 'captain-hook' } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const res = { status: stubbedStatus }

      await getVillainsBySlug(req, res)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          slug: 'captain-hook'
        },
        attributes: ['name', 'movie', 'slug']
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('HTTP Error 500 unable to handle this request')
    })
    describe('addNewVillain', () => {
      it('accepts new villain details and adds it in the DB, returning the added record with a 201 status', async () => {
        const req = { body: postedVillain }
        const stubbedSend = sinon.stub()
        const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
        const res = { status: stubbedStatus }
        const stubbedCreate = sinon.stub(models.villains, 'create').returns(singleVillain)

        await addNewVillain(req, res)
        expect(stubbedCreate).to.have.been.calledWith(postedVillain)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleVillain)
      })
    })
  })
})
