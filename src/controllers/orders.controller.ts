import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { OrdersService } from '../services';

export default class OrdersController {
  constructor(private ordersService = new OrdersService()) {}

  public getAllOrders = async (_req: Request, res: Response): Promise<void> => {
    const orders = await this.ordersService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };
}
