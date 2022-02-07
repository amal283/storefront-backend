import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import verifyAuthToken from './security';

const store = new ProductStore();

const index = async(_req: Request, res: Response) => {
    try {
    const products = await store.index();
    return res.json(products);
} catch (error) {
    res.status(400);
    res.json(error);
}
}

const show = async(_req: Request, res: Response) => {
    try {
        const product = await store.show(_req.params.id);
        return res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async(_req: Request, res: Response) => {
    try {
        const product = await store.create(_req.body);
        return res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getProductsByCategory = async(_req: Request, res: Response) => {
    try {
        const products = await store.getProductsByCategory(_req.params.category);
        return res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.get('/products/category/:category', getProductsByCategory);
}

export default productRoutes;