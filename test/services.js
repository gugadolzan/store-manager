const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../src/models/productsModel.js");
const salesModel = require("../src/models/salesModel.js");
const productsService = require("../src/services/productsService.js");
const salesService = require("../src/services/salesService.js");

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

describe("Sales service", () => {
  describe("when calling the create method", () => {
    describe("when the sales are created", () => {
      const sales = [
        {
          product_id: 1,
          quantity: 2,
        },
        {
          product_id: 2,
          quantity: 5,
        },
      ];

      const result = {
        id: 1,
        itemsSold: [
          {
            product_id: 1,
            quantity: 2,
          },
          {
            product_id: 2,
            quantity: 5,
          },
        ],
      };

      before(() => {
        sinon
          .stub(productsModel, "getById")
          .onFirstCall()
          .resolves({
            id: 1,
            name: "produto A",
            quantity: 10,
          })
          .onSecondCall()
          .resolves({
            id: 2,
            name: "produto B",
            quantity: 20,
          });
        sinon.stub(productsModel, "update").resolves();
        sinon.stub(salesModel, "create").resolves(result);
      });

      after(() => {
        productsModel.getById.restore();
        productsModel.update.restore();
        salesModel.create.restore();
      });

      it("should return an object with the properties 'id', 'product' and 'quantity' and respective values", async () => {
        const response = await salesService.create(sales);

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "itemsSold");
        expect(response).to.deep.equal({
          id: 1,
          itemsSold: [
            {
              product_id: 1,
              quantity: 2,
            },
            {
              product_id: 2,
              quantity: 5,
            },
          ],
        });
      });
    });
  });

  describe("when calling the getAll method", () => {
    describe("when there are sales", () => {
      before(() => {
        const sales = [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ];

        sinon.stub(salesModel, "getAll").resolves(sales);
      });

      after(() => {
        salesModel.getAll.restore();
      });

      it("should return an array of objects and respective values", async () => {
        const response = await salesService.getAll();

        expect(response).to.be.an("array");
        expect(response).to.deep.equal([
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ]);
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the sale exists", () => {
      before(() => {
        const sale = [
          {
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ];

        sinon.stub(salesModel, "getById").resolves(sale);
      });

      after(() => {
        salesModel.getById.restore();
      });

      it("should return an array of objects and respective values", async () => {
        const response = await salesService.getById({ id: 1 });

        expect(response).to.be.an("array");
        expect(response).to.deep.equal([
          {
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ]);
      });
    });
  });

  describe("when calling the update method", () => {
    describe("when the sale exists", () => {
      before(() => {
        const sale = [
          {
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ];

        sinon.stub(salesModel, "getById").resolves(sale);
        sinon.stub(salesModel, "update").resolves();
      });

      after(() => {
        salesModel.getById.restore();
        salesModel.update.restore();
      });

      it("should return an object with the properties 'saleId' and 'itemUpdated'", async () => {
        const response = await salesService.update({
          id: 1,
          sale: {
            product_id: 1,
            quantity: 6,
          },
        });

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("saleId", "itemUpdated");
        expect(response).to.deep.equal({
          saleId: 1,
          itemUpdated: [
            {
              product_id: 1,
              quantity: 6,
            },
          ],
        });
      });
    });
  });

  describe("when calling the remove method", () => {
    describe("when the sale exists", () => {
      before(() => {
        sinon.stub(salesModel, "getById").resolves([
          {
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ]);
        sinon
          .stub(productsModel, "getById")
          .resolves({ id: 1, name: "produto A", quantity: 10 });
        sinon.stub(productsModel, "update").resolves();
        sinon.stub(salesModel, "remove").resolves();
      });

      after(() => {
        salesModel.getById.restore();
        productsModel.getById.restore();
        productsModel.update.restore();
        salesModel.remove.restore();
      });

      it("should return an array of objects and respective values", async () => {
        const response = await salesService.remove({ id: 1 });

        expect(response).to.be.an("array");
        expect(response).to.deep.equal([
          {
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2,
          },
          {
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2,
          },
        ]);
      });
    });
  });
});
