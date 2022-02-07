import request from 'supertest';
import app from '../server';

describe('Users Routes', () => {
    it('create endpoint', async () => {
        await request(app)
        .post('/users')
        .send({firstName: 'firstName', lastName: 'lastName', password: 'password123'})
        .expect(200);
    });

    it('authenicate user endpoint', async () => {
        await request(app)
        .post('/users/authenicate')
        .send({firstName: 'name', lastName: 'name', password: '123'})
        .expect(200);
    });

    it('show endpoint', async () => {
        await request(app)
        .get('/users/1')
        .expect(401);
    });

    it('index endpoint', async () => {
        await request(app)
        .get('/users')
        .expect(401);
    });
});

    

