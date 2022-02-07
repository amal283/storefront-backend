"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const security_1 = __importDefault(require("./security"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        return res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (_req, res) => {
    try {
        const order = await store.show(_req.params.id);
        return res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (_req, res) => {
    try {
        const order = await store.create(_req.body);
        return res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const getCurrentOrderByUser = async (_req, res) => {
    try {
        const order = await store.getCurrentOrderByUser(_req.params.userId);
        return res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const getCompletedOrdersByUser = async (_req, res) => {
    try {
        const order = await store.getCompletedOrdersByUser(_req.params.userId);
        return res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProduct = async (_req, res) => {
    try {
        const order = await store.addProduct(_req.body.quantity, _req.params.id, _req.body.productId);
        return res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', security_1.default, index);
    app.get('/orders/:id', security_1.default, show);
    app.post('/orders', security_1.default, create);
    app.get('/orders/current-order/:userId', security_1.default, getCurrentOrderByUser);
    app.get('/orders/completed-orders/:userId', security_1.default, getCompletedOrdersByUser);
    //add product
    app.post('/orders/:id/products', security_1.default, addProduct);
};
exports.default = orderRoutes;
