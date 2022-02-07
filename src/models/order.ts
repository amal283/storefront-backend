import client from "../database"

export type Order = {
    id?: number,
    status: string,
    userId: number
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Can't get orders ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id and orders.id = ($1)';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Can't get order ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

            const result = await conn.query(sql, [o.status, o.userId]);

            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Can't get create order ${err}`);
        }
    }

    async getCurrentOrderByUser(userId: string): Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id = ($1) and status = 'Active'`;

            const result = await conn.query(sql, [userId]);

            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Can't get current order ${err}`);
        }
    }

    async getCompletedOrdersByUser(userId: string): Promise<Order[]> {
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id = ($1) and status = 'Complete'`;

            const result = await conn.query(sql, [userId]);

            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Can't completed orders ${err}`);
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await client.connect();
      
            const result = await conn.query(ordersql, [orderId]);
      
            const order = result.rows[0];
      
            if (order.status !== "open") {
              throw new Error(`Can't add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
      
            conn.release();
          } catch (err) {
            throw new Error(`${err}`);
          }
      
          try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await client.connect();
      
            const result = await conn.query(sql, [quantity, orderId, productId]);
      
            const order = result.rows[0];
      
            conn.release();
      
            return order;
          } catch (err) {
            throw new Error(`Can't add product ${productId} to order ${orderId}: ${err}`);
          }
    }
}