import express from 'express';
import ProductsController from '../controllers';

const router = express.Router();

const productsController = new ProductsController();

router.route('/')
  .post(productsController.createProduct);

export default router;
