const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel.js');

describe('Call the create method from the productsModel', () => {
  const newProduct = { name: 'produto', quantity: 10 };

  before(() => {
    const execute = [{ ...newProduct, insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('when the product is created', () => {
    it('should return an object', async () => {
      const response = await productsModel.create(newProduct);

      expect(response).to.be.an('object');
    });

    it("should return an object with the properties 'id', 'name' and 'quantity'", async () => {
      const response = await productsModel.create(newProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});
