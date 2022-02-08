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

module.exports = {
  create,
};
