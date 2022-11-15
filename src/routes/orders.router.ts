import express from 'express';
import { OrdersController } from '../controllers';
import { verifyTokenMiddleware, verifyProductsList } from '../middlewares';

const router = express.Router();

const ordersController = new OrdersController();

router.route('/')
  .get(ordersController.getAllOrders)
  .post(verifyTokenMiddleware, verifyProductsList, ordersController.createOrder);

export default router;
