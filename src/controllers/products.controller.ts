import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProductsService, validateProductFields } from '../services';

class ProductsController {
  constructor(private productsService = new ProductsService()) { }

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const newProduct = validateProductFields(req.body);
    const productCreated = await this.productsService.create(newProduct);
    res.status(StatusCodes.CREATED).json(productCreated);
  };

  public getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    const products = await this.productsService.getAll();
    res.status(StatusCodes.OK).json(products);
  };
}

export default ProductsController;
