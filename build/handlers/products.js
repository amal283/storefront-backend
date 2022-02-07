"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const security_1 = __importDefault(require("./security"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        return res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (_req, res) => {
    try {
        const product = await store.show(_req.params.id);
        return res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (_req, res) => {
    try {
        const product = await store.create(_req.body);
        return res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const getProductsByCategory = async (_req, res) => {
    try {
        const products = await store.getProductsByCategory(_req.params.category);
        return res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', security_1.default, create);
    app.get('/products/category/:category', getProductsByCategory);
};
exports.default = productRoutes;
