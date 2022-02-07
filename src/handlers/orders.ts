import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from './security';

const store = new OrderStore();

const index = async(_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        return res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async(_req: Request, res: Response) => {
    try{
        const order = await store.show(_req.params.id);
        return res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async(_req: Request, res: Response) => {
    try{
        const order = await store.create(_req.body);
        return res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getCurrentOrderByUser = async(_req: Request, res: Response) => {
    try{
        const order = await store.getCurrentOrderByUser(_req.params.userId);
        return res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getCompletedOrdersByUser = async(_req: Request, res: Response) => {
    try{
        const order = await store.getCompletedOrdersByUser(_req.params.userId);
        return res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const addProduct = async(_req: Request, res: Response) => {
    try{
        const order = await store.addProduct(_req.body.quantity, _req.params.id, _req.body.productId);
        return res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.get('/orders/current-order/:userId', verifyAuthToken, getCurrentOrderByUser);
    app.get('/orders/completed-orders/:userId', verifyAuthToken, getCompletedOrdersByUser);
    //add product
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes;