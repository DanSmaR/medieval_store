import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductsOrder, IUserJWT } from '../interfaces';

import { OrdersService, ProductsService } from '../services';

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
    req: Request<unknown, unknown, { user: IUserJWT } & IProductsOrder>,
    res: Response,
  ): Promise<void> => {
    const { user, productsIds } = req.body;
    const orderId = await this.ordersService.createOrder(user.id);
    await Promise.all(productsIds
      .map((productId) => this.productsService.update(orderId, productId)));
    res.status(StatusCodes.CREATED).json({ userId: user.id, productsIds });
  };
}
