import { Pool, RowDataPacket } from 'mysql2/promise';

import { IOrder } from '../interfaces';

export default class OrdersModel {
  constructor(private connection: Pool) {}

  public async getAll(): Promise<IOrder[]> {
    const [result] = await this.connection
      .execute<(RowDataPacket & IOrder)[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
        FROM Trybesmith.Orders AS o
        JOIN Trybesmith.Products AS p
        ON o.id = p.orderId
        GROUP BY o.id`);
    return result;
  }
}