"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const security_1 = __importDefault(require("./security"));
const store = new user_1.UserStore();
const create = async (_req, res) => {
    const user = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    };
    try {
        const newUser = await store.create(_req.body);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, (process.env.TOKEN_SECRET));
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
};
const autenticateUser = async (_req, res) => {
    const user = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    };
    try {
        const authenticatedUser = await store.autenticateUser(_req.body.firstName, _req.body.lastName, _req.body.password);
        const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, (process.env.TOKEN_SECRET));
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
const show = async (_req, res) => {
    try {
        const user = await store.show(_req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
const index = async (_req, res) => {
    try {
        const user = await store.index();
        res.json(user);
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
const userRoutes = (app) => {
    app.post('/users', create);
    app.post('/users/authenicate', autenticateUser);
    app.get('/users/:id', security_1.default, show);
    app.get('/users', security_1.default, index);
};
exports.default = userRoutes;
