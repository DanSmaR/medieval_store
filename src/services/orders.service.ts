import connection from '../models/connection';
import { OrdersModel } from '../models';
import { IOrder, IProductsOrder } from '../interfaces';
import { orderProductsSchema } from './validations/schemas';
import CustomAPIError from '../errors/customError';
import getStatusCodeErrValidation from '../errors/httpErrorValidationStatusCode';

class OrdersService {
  constructor(private ordersModel = new OrdersModel(connection)) {}

  public getAll(): Promise<IOrder[]> {
    return this.ordersModel.getAll();
  }

  public createOrder(userId: number): Promise<number> {
    return this.ordersModel.create(userId);
  }
}

const validateProductsOrderList = (productsIds: IProductsOrder): void => {
  const { error } = orderProductsSchema.validate(productsIds);
  if (error) {
    throw new CustomAPIError(error.message, getStatusCodeErrValidation(error.details[0].type));
  }
};

export {
  OrdersService,
  validateProductsOrderList,
};
