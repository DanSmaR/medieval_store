import { Pool, ResultSetHeader } from 'mysql2/promise';

import { IUser } from '../interfaces';

export default class UsersModel {
  constructor(private connection: Pool) {}

  public async create(user: IUser): Promise<IUser & { id: number }> {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return { id: insertId, ...user };
  }
}