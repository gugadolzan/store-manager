const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../models/connection");
const productsModel = require("../../models/productsModel.js");

describe("Call the create method from the productsModel", () => {
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

describe("Call the getByName method from the productsModel", () => {
  describe("when the product already exists", () => {
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
      sinon.stub(connection, "execute").resolves([[]]);
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
