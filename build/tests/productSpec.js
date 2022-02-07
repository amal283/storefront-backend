"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
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
    it('create should return a defined value', async () => {
        const result = await store.create({ name: 'product', price: 10, category: 'games' });
        expect(result).toBeDefined();
    });
    it('should have a getProductsByCategory method', () => {
        expect(store.getProductsByCategory).toBeDefined();
    });
    it('getProductsByCategory should return undefined if category does not exist', async () => {
        const result = await store.getProductsByCategory('');
        expect(result).toBeUndefined();
    });
});
