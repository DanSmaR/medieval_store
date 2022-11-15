import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customError';
import { IProductsOrder } from '../interfaces';
import { ProductsService, validateProductsOrderList } from '../services';

const verifyProductsList = async (
  req: Request<unknown, unknown, IProductsOrder>,
  _res: Response, 
  next: NextFunction,
) => {
  const productsService = new ProductsService();
  const { productsIds } = req.body;
  validateProductsOrderList({ productsIds });
  const products = await Promise
    .all(productsIds.map((id) => productsService.getById(id)));
  console.log(products);
  if (products.some((product) => typeof product === 'undefined')) {
    throw new CustomAPIError('Invalid products ids', StatusCodes.BAD_REQUEST);
  }
  next();
};

export default verifyProductsList;
