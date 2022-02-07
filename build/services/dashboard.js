"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all top 5 most popular products
    async mostPopularProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price FROM products, order_products WHERE products.id = order_products.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get most popular products: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
