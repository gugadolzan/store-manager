const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../models/productsModel.js");
const productsService = require("../../services/productsService.js");

describe("Products service", () => {
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

      it("should throw an error saying that the product already exists", () => {
        try {
          productsService.create(newProduct);
        } catch (error) {
          expect(error.message).to.be.equal("alreadyExists");
        }
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
        productsModel.create.restore();
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.create(newProduct);

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({
          id: 1,
          name: "produto",
          quantity: 10,
        });
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

      it("should return an array of objects with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.getAll();

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

        expect(response).to.be.an("array");
        response.forEach((product, index) => {
          expect(product).to.be.an("object");
          expect(product).to.include.all.keys("id", "name", "quantity");
          expect(product).to.deep.equal(products[index]);
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
      before(() => {
        const product = { id: 1, name: "produto A", quantity: 10 };

        sinon.stub(productsModel, "getById").resolves(product);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.getById({ id: 1 });

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({
          id: 1,
          name: "produto A",
          quantity: 10,
        });
      });
    });

    describe("when the product does not exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(undefined);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should throw an error with the message 'productNotFound'", async () => {
        try {
          productsService.getById({ id: 1 });
        } catch (error) {
          expect(error.message).to.be.equal("productNotFound");
        }
      });
    });
  });

  describe("when calling the update method", () => {
    const product = { id: 1, name: "produto", quantity: 15 };

    describe("when the product exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(product);
        sinon.stub(productsModel, "update").resolves(product);
      });

      after(() => {
        productsModel.getById.restore();
        productsModel.update.restore();
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.update(product);

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({
          id: 1,
          name: "produto",
          quantity: 15,
        });
      });
    });

    describe("when the product does not exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(undefined);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should throw an error saying that the product already exists", () => {
        try {
          productsService.update(product);
        } catch (error) {
          expect(error.message).to.be.equal("productNotFound");
        }
      });
    });
  });

  describe("when calling the remove method", () => {
    const product = {
      id: 1,
      name: "produto A",
      quantity: 10,
    };

    describe("when the product exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(product);
        sinon.stub(productsModel, "remove").resolves();
      });

      after(() => {
        productsModel.getById.restore();
        productsModel.remove.restore();
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsService.remove({ id: 1 });

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({
          id: 1,
          name: "produto A",
          quantity: 10,
        });
      });
    });

    describe("when the product does not exists", () => {
      before(() => {
        sinon.stub(productsModel, "getById").resolves(undefined);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it("should throw an error saying that the product already exists", () => {
        try {
          productsService.remove({ id: 1 });
        } catch (error) {
          expect(error.message).to.be.equal("productNotFound");
        }
      });
    });
  });
});
