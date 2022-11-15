import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customError';
import { IUserJWT } from '../interfaces';

import { OrdersService, ProductsService, validateProductsOrderList } from '../services';

export default class OrdersController {
  constructor(
    private ordersService = new OrdersService(),
    private productsService = new ProductsService(),
  ) {}

  public getAllOrders = async (_req: Request, res: Response): Promise<void> => {
    const orders = await this.ordersService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  public createOrder = async (
    req: Request<unknown, unknown, { user: IUserJWT, productsIds: number[] }>,
    res: Response,
  ): Promise<void> => {
    const { user, productsIds } = req.body;
    validateProductsOrderList({ productsIds });
    const orderId = await this.ordersService.createOrder(user.id);
    const products = await Promise
      .all(productsIds.map((id) => this.productsService.getById(id)));
    if (products.length !== productsIds.length) {
      throw new CustomAPIError('Invalid products ids', StatusCodes.BAD_REQUEST);
    }
    await Promise.all(productsIds
      .map((productId) => this.productsService.update(orderId, productId)));
    res.status(StatusCodes.CREATED).json({ userId: user.id, productsIds });
  };
}
