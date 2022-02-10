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

const getAll = async () => {
  const query = `
  SELECT * FROM products
`;

  const [result] = await connection.execute(query);

  return result;
};

const getById = async ({ id }) => {
  const query = `
  SELECT * FROM products
  WHERE id = ?
`;

  const values = [id];

  const [result] = await connection.execute(query, values);

  return result[0];
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
  getAll,
  getById,
  getByName,
};
