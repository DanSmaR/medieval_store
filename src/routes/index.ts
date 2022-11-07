import express from 'express';
import productsRouter from './products.router';
import usersRouter from './users.router';
import ordersRouter from './orders.router';

const routers = express.Router();

routers.use('/products', productsRouter);
routers.use('/users', usersRouter);
routers.use('/orders', ordersRouter);

export default routers;
