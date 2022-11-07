import connection from '../models/connection';
import { OrdersModel } from '../models';
import { IOrder } from '../interfaces';

export default class OrdersService {
  constructor(private ordersModel = new OrdersModel(connection)) {}

  public getAll(): Promise<IOrder[]> {
    return this.ordersModel.getAll();
  }
}