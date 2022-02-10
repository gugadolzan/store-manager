const { expect } = require("chai");
const sinon = require("sinon");

const testCases = require("./utils/testCases");

const productsController = require("../../controllers/productsController.js");
const productsService = require("../../services/productsService.js");

describe("Test products controller", () => {
  describe("when calling the create method", () => {
    describe("when the payload is invalid", () => {
      testCases.productsController.create.forEach(({ description, tests }) => {
        describe(description, () => {
          tests.forEach(({ payload, errorMessage }) => {
            const response = {};
            const request = {};
            const next = sinon.spy();

            before(() => {
              request.body = payload;

              response.status = sinon.stub().returns(response);
              response.json = sinon.stub().returns();
            });

            describe(`when the payload is ${JSON.stringify(payload)}`, () => {
              it("should call the next function", async () => {
                await productsController.create(request, response, next);

                expect(next.calledOnce).to.be.true;
              });

              it(`should call the next function with an error with message '${errorMessage}'`, async () => {
                await productsController.create(request, response, next);

                // Spy call: https://sinonjs.org/releases/latest/spy-call/
                const error = next.lastCall.firstArg;

                expect(next.calledWith(sinon.match.instanceOf(Error))).to.be
                  .true;
                expect(error.message).to.be.equal(errorMessage);
              });
            });
          });
        });
      });
    });

    describe("when the product already exists", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        request.body = { name: "produto", quantity: 100 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsService, "create")
          .resolves({ error: { message: "Product already exists" } });
      });

      after(() => {
        productsService.create.restore();
      });

      it("should call the next function", async () => {
        await productsController.create(request, response, next);

        expect(next.calledOnce).to.be.true;
      });

      it('should call the next function with an error with message "Product already exists"', async () => {
        await productsController.create(request, response, next);

        const error = next.lastCall.firstArg;

        expect(next.calledWith(sinon.match.instanceOf(Error))).to.be.true;
        expect(error.message).to.be.equal("Product already exists");
        // expect(
        //   next.calledWith(sinon.match.has('message', 'Product already exists'))
        // ).to.be.true;
      });
    });

    describe("when the product is created", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        request.body = { name: "produto", quantity: 10 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsService, "create")
          .resolves({ ...request.body, id: 1 });
      });

      after(() => {
        productsService.create.restore();
      });

      it("should call the status method with status code 201", async () => {
        await productsController.create(request, response, next);
        const status = response.status.lastCall.firstArg;

        expect(status).to.be.equal(201);
        // expect(response.status.calledWith(201)).to.be.true;
      });

      it("should call the json method with the product", async () => {
        await productsController.create(request, response, next);

        const actual = response.json.lastCall.firstArg;
        const expected = { ...request.body, id: 1 };

        expect(actual).to.be.deep.equal(expected);
        // expect(response.json.calledWith({ id: 1, name: 'produto', quantity: 10 }))
        //   .to.be.true;
      });
    });
  });

  describe("when calling the getAll method", () => {
    describe("when there are products", () => {
      const products = [
        {
          id: 1,
          name: "produto A",
          quantity: 10,
        },
        {
          id: 2,
          name: "produto B",
          quantity: 20,
        },
      ];

      const response = {};
      const request = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, "getAll").resolves(products);
      });

      after(() => {
        productsService.getAll.restore();
      });

      it("should call the status method with status code 200", async () => {
        // express-rescue needs a function as third argument
        await productsController.getAll(request, response, () => {});

        const status = response.status.lastCall.firstArg;

        expect(status).to.be.equal(200);
      });

      it("should call the json method with the products", async () => {
        await productsController.getAll(request, response, () => {});

        const actual = response.json.lastCall.firstArg;
        const expected = [
          {
            id: 1,
            name: "produto A",
            quantity: 10,
          },
          {
            id: 2,
            name: "produto B",
            quantity: 20,
          },
        ];

        expect(actual).to.be.deep.equal(expected);
      });
    });

    describe("when there are no products", () => {
      const response = {};
      const request = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, "getAll").resolves([]);
      });

      after(() => {
        productsService.getAll.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.getAll(request, response, () => {});

        const status = response.status.lastCall.firstArg;

        expect(status).to.be.equal(200);
      });

      it("should call the json method with an empty array", async () => {
        await productsController.getAll(request, response, () => {});

        const actual = response.json.lastCall.firstArg;

        expect(actual).to.be.deep.equal([]);
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the product exists", () => {
      const product = { id: 1, name: "produto A", quantity: 10 };

      const response = {};
      const request = {};

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, "getById").resolves(product);
      });

      after(() => {
        productsService.getById.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.getById(request, response, () => {});

        const status = response.status.lastCall.firstArg;

        expect(status).to.be.equal(200);
      });

      it("should call the json method with the products", async () => {
        await productsController.getById(request, response, () => {});

        const actual = response.json.lastCall.firstArg;
        const expected = { id: 1, name: "produto A", quantity: 10 };

        expect(actual).to.be.deep.equal(expected);
      });
    });

    // describe("when the product does not exists", () => {});
  });
});
