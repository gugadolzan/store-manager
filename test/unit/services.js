const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../models/productsModel.js');
const productsService = require('../../services/productsService.js');

describe('Call the create method from the productsService', () => {
  const newProduct = { name: 'produto', quantity: 10 };

  describe('when the product already exists', () => {
    before(() => {
      const product = { ...newProduct, id: 1 };

      sinon.stub(productsModel, 'getByName').resolves(product);
    });

    after(() => {
      productsModel.getByName.restore();
    });

    it('should return an object', async () => {
      const response = await productsService.create(newProduct);

      expect(response).to.be.an('object');
    });

    it('should return an object with the correct properties', async () => {
      const response = await productsService.create(newProduct);

      expect(response).to.have.deep.property('error', {
        message: 'Product already exists',
      });
    });
  });

  describe('when the product is created', () => {
    before(() => {
      const product = { ...newProduct, id: 1 };

      sinon.stub(productsModel, 'getByName').resolves(undefined);
      sinon.stub(productsModel, 'create').resolves(product);
    });

    after(() => {
      productsModel.getByName.restore();
    });

    it('should return an object', async () => {
      const response = await productsService.create(newProduct);

      expect(response).to.be.an('object');
    });

    it('should return an object with the correct properties', async () => {
      const response = await productsService.create(newProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});
