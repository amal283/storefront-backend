"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const mostPopularProducts = async (_req, res) => {
    try {
        const products = await dashboard.mostPopularProducts();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const dashboardRoutes = (app) => {
    app.get('/most_popular_products', mostPopularProducts);
};
exports.default = dashboardRoutes;
