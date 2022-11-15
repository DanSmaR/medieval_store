import connection from '../models/connection';
import { ProductsModel } from '../models';
import { IProduct } from '../interfaces';
import { productSchema } from './validations/schemas';
import CustomAPIError from '../errors/customError';
import getStatusCodeErrValidation from '../errors/httpErrorValidationStatusCode';

class ProductsService {
  constructor(private productsModel = new ProductsModel(connection)) {}

  public create(product: IProduct): Promise<IProduct> {
    return this.productsModel.create(product);
  }

  public getAll(): Promise<IProduct[]> {
    return this.productsModel.getAll();
  }

  public getById(id:number): Promise<IProduct> {
    return this.productsModel.getById(id);
  }

  public update(orderId: number, productId: number): Promise<number> {
    return this.productsModel.update(orderId, productId);
  }
}

const validateProductFields = (data: IProduct): IProduct => {
  const { error, value } = productSchema.validate(data);

  if (error) {
    throw new CustomAPIError(error.message, getStatusCodeErrValidation(error.details[0].type));
  }
  
  return value;
};

export {
  ProductsService,
  validateProductFields,
};
