import connection from '../models/connection';
import ProductsModel from '../models';
import IProduct from '../interfaces';

class ProductsService {
  constructor(private productsModel = new ProductsModel(connection)) {}

  public create(product: IProduct): Promise<IProduct> {
    return this.productsModel.create(product);
  }

  public getAll(): Promise<IProduct[]> {
    return this.productsModel.getAll();
  }
}

export default ProductsService;
