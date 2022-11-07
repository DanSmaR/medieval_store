import express from 'express';
import { OrdersController } from '../controllers';

const router = express.Router();

const ordersController = new OrdersController();

router.route('/')
  .get(ordersController.getAllOrders);

export default router;
