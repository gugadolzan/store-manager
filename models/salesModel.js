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

module.exports = {
  create,
};
