const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../models/connection");
const productsModel = require("../../models/productsModel.js");
const salesModel = require("../../models/salesModel.js");

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

describe("Sales model", () => {
  describe("when calling the createSale method", () => {
    describe("when the sale is created", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the correct parameters", async () => {
        await salesModel.createSale();

        const query = connection.execute.args[0][0];

        expect(connection.execute.calledOnce).to.be.true;
        expect(query).to.equal("\n    INSERT INTO sales\n    VALUES ()\n  ");
      });

      it("should return the id of the sale created", async () => {
        const response = await salesModel.createSale();

        expect(response).to.equal(1);
      });
    });
  });

  describe("when calling the create method", () => {
    describe("when the sale is created", () => {
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

      before(() => {
        sinon
          .stub(connection, "execute")
          .onFirstCall()
          .resolves([{ insertId: 1 }])
          .onSecondCall()
          .resolves();
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the correct query and return the sale created", async () => {
        const response = await salesModel.create(sales);

        // Get query from second call
        const query = connection.execute.args[1][0];

        expect(query).to.equal(
          "\n    INSERT INTO sales_products\n    VALUES (?, ?, ?)\n  "
        );
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
        const execute = [
          [
            {
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
            },
            {
              id: 2,
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
            },
          ],
        ];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return the sales", async () => {
        const response = await salesModel.getAll();

        expect(response).to.deep.equal([
          {
            saleId: 1,
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
          },
          {
            saleId: 2,
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
          },
        ]);
      });
    });
  });

  describe("when calling the getById method", () => {
    describe("when the sale exists", () => {
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

      before(() => {
        const execute = [sale];

        sinon.stub(connection, "execute").resolves(execute);
      });

      after(() => {
        connection.execute.restore();
      });

      it("should return the sale", async () => {
        const response = await salesModel.getById({ id: 1 });

        expect(response).to.deep.equal(sale);
      });
    });
  });

  describe("when calling the update method", () => {
    describe("when the sale is updated", () => {
      const sale = {
        id: 1,
        sale: {
          product_id: 1,
          quantity: 6,
        },
      };

      before(() => {
        sinon.stub(connection, "execute").resolves();
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the corrects parameters", async () => {
        await salesModel.update(sale);

        const query = connection.execute.args[0][0];
        const values = connection.execute.args[0][1];

        expect(connection.execute.calledOnce).to.be.true;
        expect(query).to.equal(
          "\n    UPDATE sales_products\n    SET quantity = ?\n    WHERE sale_id = ? AND product_id = ?\n  "
        );
        expect(values).to.deep.equal([6, 1, 1]);
      });
    });
  });

  describe("when calling the remove method", () => {
    describe("when the sale is removed", () => {
      before(() => {
        sinon.stub(connection, "execute").resolves();
      });

      after(() => {
        connection.execute.restore();
      });

      it("should call the execute method with the corrects parameters", async () => {
        await salesModel.remove({ id: 1 });

        const query = connection.execute.args[0][0];
        const values = connection.execute.args[0][1];

        expect(connection.execute.calledOnce).to.be.true;
        expect(query).to.equal("\n    DELETE FROM sales\n    WHERE id = ?\n  ");
        expect(values).to.deep.equal([1]);
      });
    });
  });
});
