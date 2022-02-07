import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()

const mostPopularProducts = async (_req: Request, res: Response) => {
  try{
    const products = await dashboard.mostPopularProducts()
    res.json(products)
  } catch (error) {
      res.status(400);
      res.json(error);
  }
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/most_popular_products', mostPopularProducts)
}

export default dashboardRoutes;