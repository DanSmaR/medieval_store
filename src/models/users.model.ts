import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

import { ILoginUser, IUser } from '../interfaces';

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

  public async getUserByNameAndPassword(user: ILoginUser): Promise<IUser & { id: number }> {
    const { username, password } = user;
    const [[result]] = await this.connection.execute<(
    RowDataPacket & IUser & { id: number })[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
      );
    return result;
  }
}