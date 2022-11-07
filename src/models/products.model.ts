import { Pool, ResultSetHeader } from 'mysql2/promise';

import IProduct from '../interfaces';

export default class ProductsModel {
  constructor(private connection: Pool) {}

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    return { id: insertId, ...product };
  }
}
