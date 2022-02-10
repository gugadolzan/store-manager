const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../models/connection");
const productsModel = require("../../models/productsModel.js");

describe("Test products model", () => {
  describe("when calling the create method", () => {
    const product = { name: "produto", quantity: 10 };

    before(() => {
      const execute = [{ ...product, insertId: 1 }];

      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    describe("when the product is created", () => {
      it("should return an object", async () => {
        const response = await productsModel.create(product);

        expect(response).to.be.an("object");
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.create(product);

        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({ ...product, id: 1 });
      });
    });
  });

  describe("when calling the getByName method", () => {
    describe("when the product exists", () => {
      const product = { name: "produto", quantity: 100 };

      before(() => {
        const execute = [[{ ...product, id: 1 }]];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return an object", async () => {
        const response = await productsModel.getByName({ name: "produto" });

        expect(response).to.be.an("object");
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.getByName(product);

        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({ ...product, id: 1 });
      });
    });

    describe("when the product does not exist", () => {
      const product = { name: "produto", quantity: 10 };

      before(() => {
        const execute = [[]];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return undefined", async () => {
        const response = await productsModel.getByName(product);

        expect(response).to.be.undefined;
      });
    });
  });

  describe("when calling the getAll method", () => {
    describe("when there are products", () => {
      before(() => {
        const execute = [
          [
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
          ],
        ];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return an array of objects", async () => {
        const response = await productsModel.getAll();

        expect(response).to.be.an("array");
        response.forEach((product) => {
          expect(product).to.be.an("object");
        });
      });

      it("should return an array of objects with the properties 'id', 'name' and 'quantity'", async () => {
        const response = await productsModel.getAll();

        response.forEach((product) => {
          expect(product).to.include.all.keys("id", "name", "quantity");
        });
      });
    });

    describe("when there are no products", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return an empty array", async () => {
        const response = await productsModel.getAll();

        expect(response).to.be.an("array");
        expect(response).to.be.empty;
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the product exists", () => {
      const product = { id: 1, name: "produto A", quantity: 10 };

      before(() => {
        const execute = [[product]];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return an object", async () => {
        const response = await productsModel.getById({ id: 1 });

        expect(response).to.be.an("object");
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.getById({ id: 1 });

        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal(product);
      });
    });

    describe("when the product does not exists", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return undefined", async () => {
        const response = await productsModel.getById({ id: 1 });

        expect(response).to.be.undefined;
      });
    });
  });
});
