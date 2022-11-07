import connection from '../models/connection';
import ProductsModel from '../models';
import IProduct from '../interfaces';

class ProductsService {
  constructor(private productsModel = new ProductsModel(connection)) {}

  public async create(product: IProduct): Promise<IProduct> {
    return this.productsModel.create(product);
  }
}

export default ProductsService;
