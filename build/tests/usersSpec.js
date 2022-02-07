"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Users Routes', () => {
    it('create endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ firstName: 'firstName', lastName: 'lastName', password: 'password123' })
            .expect(200);
    });
    it('authenicate user endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .post('/users/authenicate')
            .send({ firstName: 'name', lastName: 'name', password: '123' })
            .expect(200);
    });
    it('show endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/users/1')
            .expect(401);
    });
    it('index endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/users')
            .expect(401);
    });
});
