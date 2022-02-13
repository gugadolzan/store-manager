const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../models/connection");
const productsModel = require("../../models/productsModel.js");

describe("Products model", () => {
  describe("when calling the create method", () => {
    describe("when the product is created", () => {
      const product = { name: "produto", quantity: 10 };

      before(() => {
        const execute = [{ ...product, insertId: 1 }];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.create(product);

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

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.getByName({ name: "produto" });

        expect(response).to.be.an("object");
        expect(response).to.include.all.keys("id", "name", "quantity");
        expect(response).to.deep.equal({
          id: 1,
          name: "produto",
          quantity: 100,
        });
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
        const response = await productsModel.getByName({ name: "produto" });

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

      it("should return an array of objects with the properties 'id', 'name' and 'quantity'", async () => {
        const response = await productsModel.getAll();

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
        const execute = [[]];

        sinon.stub(connection, "execute").resolves(execute);
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

      it("should return an object with the properties 'id', 'name' and 'quantity' and respective values", async () => {
        const response = await productsModel.getById({ id: 1 });

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
        const execute = [[]];

        sinon.stub(connection, "execute").resolves(execute);
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

  describe("when calling the update method", () => {
    describe("when the product is updated", () => {
      const product = { id: 1, name: "produto", quantity: 15 };

      before(() => {
        sinon.stub(connection, "execute").resolves();
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the correct parameters", async () => {
        await productsModel.update(product);

        const query = connection.execute.args[0][0];
        const values = connection.execute.args[0][1];

        expect(connection.execute.calledOnce).to.be.true;
        expect(query).to.equal(
          "\n    UPDATE products\n    SET name = ?, quantity = ?\n    WHERE id = ?\n  "
        );
        expect(values).to.deep.equal(["produto", 15, 1]);
      });
    });
  });

  describe("when calling the remove method", () => {
    describe("when the product is removed", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves();
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the correct parameters", async () => {
        await productsModel.remove({ id: 1 });

        const query = connection.execute.args[0][0];
        const values = connection.execute.args[0][1];

        expect(connection.execute.calledOnce).to.be.true;
        expect(query).to.equal(
          "\n    DELETE FROM products\n    WHERE id = ?\n  "
        );
        expect(values).to.deep.equal([1]);
      });
    });
  });
});
