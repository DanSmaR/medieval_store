import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ProductsService from '../services';

class ProductsController {
  constructor(private productsService = new ProductsService()) { }

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const newProduct = req.body;
    const productCreated = await this.productsService.create(newProduct);
    res.status(StatusCodes.CREATED).json(productCreated);
  };
}

export default ProductsController;
