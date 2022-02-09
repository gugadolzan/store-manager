const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = `
    INSERT INTO products (name, quantity)
    VALUES (?, ?)
  `;

  const values = [name, quantity];

  const [result] = await connection.execute(query, values);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const query = `
    SELECT * FROM products
    WHERE name = ?
  `;

  const values = [name];

  const [result] = await connection.execute(query, values);

  return result[0];
};

module.exports = {
  create,
  getByName,
};
