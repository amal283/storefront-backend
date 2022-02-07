import request from 'supertest';
import app from '../server';

describe('Orders Routes', () => {
    it('index endpoint', async () => {
        await request(app)
        .get('/orders')
        .expect(401);
    });

    it('show endpoint', async () => {
        await request(app)
        .get('/orders/1')
        .expect(401);
    });

    it('create endpoint', async () => {
        await request(app)
        .post('/orders')
        .send({status: 'product', userId:10})
        .expect(401);
    });

    it('get current order by user endpoint', async () => {
        await request(app)
        .get('/orders/current-order/1')
        .expect(401);
    });
    
    it('get completed orders by user endpoint', async () => {
        await request(app)
        .get('/orders/completed-orders/1')
        .expect(401);
    });

    it('add products', async () => {
        await request(app)
        .post('/orders/1/products')
        .expect(401);
    });
});