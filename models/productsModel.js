const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

  const values = [name, quantity];

  const [result] = await connection.execute(query, values);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const query = 'SELECT * FROM products';

  const [result] = await connection.execute(query);

  return result;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM products WHERE id = ?';

  const values = [id];

  const [result] = await connection.execute(query, values);

  return result[0];
};

const getByName = async ({ name }) => {
  const query = 'SELECT * FROM products WHERE name = ?';

  const values = [name];

  const [result] = await connection.execute(query, values);

  return result[0];
};

const update = async ({ id, name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

  const values = [name, quantity, id];

  await connection.execute(query, values);

  return {
    id,
    name,
    quantity,
  };
};

const remove = async ({ id }) => {
  const query = 'DELETE FROM products WHERE id = ?';

  const values = [id];

  await connection.execute(query, values);
};

module.exports = {
  create,
  getAll,
  getById,
  getByName,
  update,
  remove,
};
