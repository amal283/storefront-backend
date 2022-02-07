"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('Orders Routes', () => {
    it('index endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/orders')
            .expect(401);
    });
    it('show endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/orders/1')
            .expect(401);
    });
    it('create endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .post('/orders')
            .send({ status: 'product', userId: 10 })
            .expect(401);
    });
    it('get current order by user endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/orders/current-order/1')
            .expect(401);
    });
    it('get completed orders by user endpoint', async () => {
        await (0, supertest_1.default)(server_1.default)
            .get('/orders/completed-orders/1')
            .expect(401);
    });
    it('add products', async () => {
        await (0, supertest_1.default)(server_1.default)
            .post('/orders/1/products')
            .expect(401);
    });
});
