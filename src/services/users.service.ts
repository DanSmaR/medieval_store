import connection from '../models/connection';
import { UsersModel } from '../models';
import { IUser } from '../interfaces';
import { createToken } from '../utils/jwt.utils';

export default class UsersService {
  constructor(private usersModel = new UsersModel(connection)) {}

  public async create(user: IUser): Promise<string> {
    const newUser = await this.usersModel.create(user);
    const { password, ...newUserWithNoPassWord } = newUser;
    return createToken(newUserWithNoPassWord);
  }
}