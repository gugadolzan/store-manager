const connection = require('./connection');

const create = async (sales) => {
  // Insert default values into sales table
  // Reference: https://stackoverflow.com/a/68719760
  const query = 'INSERT INTO sales VALUES ()';

  const [{ insertId: id }] = await connection.execute(query);

  const query2 = 'INSERT INTO sales_products VALUES (?, ?, ?)';

  const itemsSold = await Promise.all(
    sales.map(async (sale) => {
      const values = [id, sale.product_id, sale.quantity];

      await connection.execute(query2, values);

      return { ...sale };
    }),
  );

  return { id, itemsSold };
};

const getAll = async () => {
  const query = `
    SELECT s.id, s.date, sp.product_id, sp.quantity
    FROM sales s
    JOIN sales_products sp ON s.id = sp.sale_id
  `;

  const [rows] = await connection.execute(query);

  // Remove properties from objects
  // Reference: https://stackoverflow.com/a/208106
  return rows.map(({ id, ...sale }) => ({ saleId: id, ...sale }));
};

const getById = async ({ id }) => {
  const query = `
    SELECT s.date, sp.product_id, sp.quantity
    FROM sales s
    JOIN sales_products sp ON s.id = sp.sale_id
    WHERE s.id = ?
  `;

  const values = [id];

  const [rows] = await connection.execute(query, values);

  return rows;
};

const update = async ({ id, sale }) => {
  const query = `
    UPDATE sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
  `;

  const values = [sale.quantity, id, sale.product_id];

  await connection.execute(query, values);

  return { saleId: id, itemUpdated: [{ ...sale }] };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
