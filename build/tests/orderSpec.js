"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a list', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('show should return a undefined value if user id does not exist', async () => {
        const result = await store.show('-1');
        expect(result).toBeUndefined;
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create should throw error if user id does not exist', async () => {
        let error = new Error();
        try {
            await store.create({ status: 'Active', userId: -1 });
        }
        catch (e) {
            error = e;
        }
        const expectedError = new Error(`Can't get create order error: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"`);
        expect(error).toEqual(expectedError);
    });
    it('should have a getCurrentOrderByUser method', () => {
        expect(store.getCurrentOrderByUser).toBeDefined();
    });
    it('getCurrentOrderByUser should return undefined if user does not exist', async () => {
        const result = await store.getCurrentOrderByUser('-1');
        expect(result).toBeUndefined();
    });
    it('should have a getCompletedOrdersByUser method', () => {
        expect(store.getCompletedOrdersByUser).toBeDefined();
    });
    it('getCompletedOrdersByUser should return undefined if user does not exist', async () => {
        const result = await store.getCompletedOrdersByUser('-1');
        expect(result).toBeUndefined();
    });
});
