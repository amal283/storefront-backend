import client from '../database'

export class DashboardQueries {
  // Get all top 5 most popular products
  async mostPopularProducts(): Promise<{name: string, price: number}[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT name, price FROM products, order_products WHERE products.id = order_products.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Can't get most popular products: ${err}`)
    } 
  }
}