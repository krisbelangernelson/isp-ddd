import express from 'express';
import type { Request, Response } from 'express';
import customerRoutes from './customer/interfaces/api/customer.routes';
import stripeRoutes from './order/interfaces/api/stripe.routes';
import { createOrder } from './order/interfaces/api/order.controller';
import { verifyOrder } from './infrastructure/middlewares/verifyOrder';
import { getInternetServices } from './service/interfaces/api/service.controller';

const invalidRoute = async (req: Request, res: Response): Promise<Response> => {
  const errData = {
    code: 'ERR-404',
    reason: 'Not Found',
    message: `Unknown route: ${req.method} ${req.url}`,
    status: 404,
  };

  return await Promise.resolve(res.status(errData.status).send(errData));
};

const app = express();

app.use(express.json());
app.use('/api/v1/auth', customerRoutes);
app.use('/api/v1/customer', customerRoutes);
app.post('/api/v1/order', verifyOrder, createOrder);
app.use('/api/v1/stripe', stripeRoutes);
app.get('/api/v1/internet-services', getInternetServices);

// Catchall for invalid route requests
app.all(
  '/{*any}',
  async (req: Request, res: Response) => await invalidRoute(req, res),
);

export default app;
