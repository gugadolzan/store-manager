const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../models/productsModel.js");
const productsService = require("../../services/productsService.js");

describe("Test products service", () => {
  describe("when calling the create method", () => {
    const newProduct = { name: "produto", quantity: 10 };

    describe("when the product already exists", () => {
      before(() => {
        const product = { ...newProduct, id: 1 };

        sinon.stub(productsModel, "getByName").resolves(product);
      });

      after(() => {
        productsModel.getByName.restore();
      });

      it("should return an object", async () => {
        const response = await productsService.create(newProduct);

        expect(response).to.be.an("object");
      });

      it("should return an object with the property 'error' and respective value", async () => {
        const response = await productsService.create(newProduct);

        expect(response).to.have.deep.property("error", {
          code: "alreadyExists",
          message: "Product already exists",
        });
      });
    });

    describe("when the product is created", () => {
      before(() => {
        const product = { ...newProduct, id: 1 };

        sinon.stub(productsModel, "getByName").resolves(undefined);
        sinon.stub(productsModel, "create").resolves(product);
      });

      after(() => {
        productsModel.getByName.restore();
      });

      it("should return an object", async () => {
        const response = await productsService.create(newProduct);

        expect(response).to.be.an("object");
      });

      it("should return an object with the properties 'id', 'name' and 'quantity'", async () => {
        const response = await productsService.create(newProduct);

        expect(response).to.include.all.keys("id", "name", "quantity");
      });
    });
  });

  describe("when calling the getAll method", () => {
    describe("when there are products", () => {
      before(() => {
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

        sinon.stub(productsModel, "getAll").resolves(products);
      });

      after(() => {
        productsModel.getAll.restore();
      });

      it("should return an array of objects", async () => {
        const response = await productsService.getAll();

        expect(response).to.be.an("array");
        response.forEach((product) => {
          expect(product).to.be.an("object");
        });
      });

      it("should return an array of objects with the properties 'id', 'name' and 'quantity'", async () => {
        const response = await productsService.getAll();

        response.forEach((product) => {
          expect(product).to.include.all.keys("id", "name", "quantity");
        });
      });
    });

    describe("when there are no products", () => {
      before(() => {
        sinon.stub(productsModel, "getAll").resolves([]);
      });

      after(() => {
        productsModel.getAll.restore();
      });

      it("should return an empty array", async () => {
        const response = await productsService.getAll();

        expect(response).to.be.an("array");
        expect(response).to.be.empty;
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the product exists", () => {
      const product = { id: 1, name: "produto A", quantity: 10 };

      before(() => {
        sinon.stub(productsModel, "getById").resolves(product);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should return an object", async () => {
        const response = await productsService.getById({ id: 1 });

        expect(response).to.be.an("object");
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.getById({ id: 1 });

        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal(product);
      });
    });

    describe("when the product does not exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(undefined);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should return an object", async () => {
        const response = await productsService.getById({ id: 1 });

        expect(response).to.be.an("object");
      });

      it("should return an object with the property 'error' and respective value", async () => {
        const response = await productsService.getById({ id: 1 });

        expect(response).to.have.deep.property("error", {
          code: "notFound",
          message: "Product not found",
        });
      });
    });
  });
});
