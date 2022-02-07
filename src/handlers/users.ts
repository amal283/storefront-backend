import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from './security';

const store = new UserStore();

const create = async (_req: Request, res: Response) => {
    const user: User= {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    }

    try {
        const newUser = await store.create(_req.body);        
        const token = jwt.sign({user: newUser}, (process.env.TOKEN_SECRET) as string)
        res.json(token);
    } catch(err) {
        res.status(400);
        res.json(err as string + user)
    }
    
}

const autenticateUser = async (_req: Request, res: Response) => {
    const user: User= {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    }
    
    try {
        const authenticatedUser = await store.autenticateUser(_req.body.firstName, _req.body.lastName, _req.body.password);
        const token = jwt.sign({user: authenticatedUser}, (process.env.TOKEN_SECRET) as string);
        res.json(token);
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
}

const show = async(_req: Request, res: Response) => {
    try {
        const user = await store.show(_req.params.id);
        res.json(user);
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
}

const index = async(_req: Request, res: Response) => {
    try {
        const user = await store.index();
        res.json(user);
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.post('/users/authenicate', autenticateUser);
    app.get('/users/:id', verifyAuthToken, show);
    app.get('/users', verifyAuthToken, index);
}

export default userRoutes;