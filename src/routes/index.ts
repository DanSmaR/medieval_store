import express from 'express';
import productRouter from './product.router';
import userRouter from './user.router';

const routers = express.Router();

routers.use('/products', productRouter);
routers.use('/users', userRouter);

export default routers;
