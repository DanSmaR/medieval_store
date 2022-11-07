import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

import { IProduct } from '../interfaces';

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

  public async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection
      .execute<(RowDataPacket & IProduct)[]>('SELECT * FROM Trybesmith.Products');
    return result;
  }
}
