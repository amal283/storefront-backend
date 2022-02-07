"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Products Routes', () => {
    it('index endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/products')
            .expect(200);
    });
    it('show endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/products/1')
            .expect(200);
    });
    it('create endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .post('/products')
            .send({ name: 'product', price: 10, category: 'games' })
            .expect(401);
    });
    it('get products by category endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/products/category/games')
            .expect(200);
    });
});
