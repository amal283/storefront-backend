import request from 'supertest';
import app from '../server';

describe('Products Routes', () => {
    it('index endpoint', async () => {
        await request(app)
        .get('/products')
        .expect(200);
    });

    it('show endpoint', async () => {
        await request(app)
        .get('/products/1')
        .expect(200);
    });

    it('create endpoint', async () => {
        await request(app)
        .post('/products')
        .send({name: 'product', price: 10, category: 'games'})
        .expect(401);
    });

    it('get products by category endpoint', async () => {
        await request(app)
        .get('/products/category/games')
        .expect(200);
    });    
});
