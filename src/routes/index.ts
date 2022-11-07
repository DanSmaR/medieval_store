import express from 'express';
import productRouter from './product.router';

const routers = express.Router();

routers.use('/products', productRouter);

export default routers;
