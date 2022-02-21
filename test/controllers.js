const { expect } = require("chai");
const sinon = require("sinon");

const productsController = require("../controllers/productsController.js");
const productsService = require("../services/productsService.js");

describe("Test products controller", () => {
  describe("when calling the create method", () => {
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

        expect(response.status.lastCall.firstArg).to.be.equal(201);
      });

      it("should call the json method with the product", async () => {
        await productsController.create(request, response, next);

        expect(response.json.lastCall.firstArg).to.be.deep.equal({
          id: 1,
          name: "produto",
          quantity: 10,
        });
      });
    });
  });

  describe("when calling the getAll method", () => {
    describe("when there are products", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, "getAll").resolves([
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
        ]);
      });

      after(() => {
        productsService.getAll.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.getAll(request, response, next);

        expect(response.status.lastCall.firstArg).to.be.equal(200);
      });

      it("should call the json method with the products", async () => {
        await productsController.getAll(request, response, next);

        expect(response.json.lastCall.firstArg).to.be.deep.equal([
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
        ]);
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the product exists", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsService, "getById")
          .resolves({ id: 1, name: "produto A", quantity: 10 });
      });

      after(() => {
        productsService.getById.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.getById(request, response, next);

        expect(response.status.lastCall.firstArg).to.be.equal(200);
      });

      it("should call the json method with the products", async () => {
        await productsController.getById(request, response, next);

        expect(response.json.lastCall.firstArg).to.be.deep.equal({
          id: 1,
          name: "produto A",
          quantity: 10,
        });
      });
    });
  });

  describe("when calling the update method", () => {
    describe("when the product exists", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        request.params = { id: 1 };
        request.body = { name: "produto A", quantity: 20 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsService, "update")
          .resolves({ id: 1, name: "produto A", quantity: 20 });
      });

      after(() => {
        productsService.update.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.update(request, response, next);

        expect(response.status.lastCall.firstArg).to.be.equal(200);
      });

      it("should call the json method with the product", async () => {
        await productsController.update(request, response, next);

        expect(response.json.lastCall.firstArg).to.be.deep.equal({
          id: 1,
          name: "produto A",
          quantity: 20,
        });
      });
    });
  });

  describe("when calling the remove method", () => {
    describe("when the product exists", () => {
      const response = {};
      const request = {};
      const next = sinon.spy();

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(productsService, "remove")
          .resolves({ id: 1, name: "produto A", quantity: 20 });
      });

      after(() => {
        productsService.remove.restore();
      });

      it("should call the status method with status code 200", async () => {
        await productsController.remove(request, response, next);

        expect(response.status.lastCall.firstArg).to.be.equal(200);
      });

      it("should call the json method with the product", async () => {
        await productsController.remove(request, response, next);

        expect(response.json.lastCall.firstArg).to.be.deep.equal({
          id: 1,
          name: "produto A",
          quantity: 20,
        });
      });
    });
  });
});
