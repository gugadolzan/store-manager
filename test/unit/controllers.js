const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../controllers/productsController.js');
const productsService = require('../../services/productsService.js');

describe('Call the create method from the productsController', () => {
  describe('when the payload is invalid', () => {
    const testCases = [
      {
        description: 'when the payload misses an attribute',
        payloads: [{}, { quantity: 10 }, { name: 'produto' }],
      },
      {
        description: "when the attribute 'name' has a length less than 5",
        payloads: [{ name: 'pro', quantity: 100 }],
      },
      {
        description: "when the attribute 'quantity' is invalid",
        payloads: [
          { name: 'produto', quantity: 'string' },
          { name: 'produto', quantity: -1 },
          { name: 'produto', quantity: 0 },
        ],
      },
    ];
  
    testCases.forEach(({ description, payloads }) => {
      describe(description, () => {
        payloads.forEach((payload) => {
          const response = {};
          const request = {};
          const next = sinon.spy();
  
          before(() => {
            request.body = payload;
  
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
          });
  
          describe(`when the payload is ${JSON.stringify(payload)}`, () => {
            it('should call the next function', async () => {
              await productsController.create(request, response, next);
    
              expect(next.calledOnce).to.be.true;
            });
    
            it('should call the next function with an error', async () => {
              await productsController.create(request, response, next);
    
              expect(next.calledWith(sinon.match.instanceOf(Error))).to.be.true;
            });
          });
        });
      });
    });
  });

  describe('when the product already exists', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      request.body = { name: 'produto', quantity: 100 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'create')
        .resolves({ error: { message: 'Product already exists' } });
    });

    after(() => {
      productsService.create.restore();
    });

    it('should call the next function', async () => {
      await productsController.create(request, response, next);

      expect(next.calledOnce).to.be.true;
    });

    it('should call the next function with an error with message "Product already exists"', async () => {
      await productsController.create(request, response, next);

      expect(next.calledWith(sinon.match.instanceOf(Error))).to.be.true;
      expect(
        next.calledWith(sinon.match.has('message', 'Product already exists'))
      ).to.be.true;
    });
  });

  describe('when the product is created', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      request.body = { name: 'produto', quantity: 10 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'create')
        .resolves({ ...request.body, id: 1 });
    });

    after(() => {
      productsService.create.restore();
    });

    it('should call the status method with status code 201', async () => {
      await productsController.create(request, response, next);

      expect(response.status.calledWith(201)).to.be.true;
    });

    it('should call the json method with the product', async () => {
      await productsController.create(request, response, next);

      expect(response.json.calledWith({ id: 1, name: 'produto', quantity: 10 }))
        .to.be.true;
    });
  });
});
