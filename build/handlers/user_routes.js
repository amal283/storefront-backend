"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const create = async (_req, res) => {
    const user = {
        username: _req.body.username,
        password_digest: _req.body.password_digest
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
        username: _req.body.username,
        password_digest: _req.body.password_digest
    };
    const authenticatedUser = await store.autenticateUser(_req.body.username, _req.body.password_digest);
    const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, (process.env.TOKEN_SECRET));
    res.json(_req.body.username);
};
const user_routes = (app) => {
    app.post('/users', create);
    app.post('/authenicate', autenticateUser);
};
exports.default = user_routes;
