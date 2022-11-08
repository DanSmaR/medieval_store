import express from 'express';
import productsRouter from './products.router';
import usersRouter from './users.router';
import ordersRouter from './orders.router';
import authRouter from './auth.router';

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/products', productsRouter);
routers.use('/users', usersRouter);
routers.use('/orders', ordersRouter);

export default routers;
