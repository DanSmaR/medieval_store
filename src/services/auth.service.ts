import { StatusCodes } from 'http-status-codes';

import { UsersModel } from '../models';
import loginSchema from './validations/schemas';
import { createToken } from '../utils/jwt.utils';
import { ILoginUser } from '../interfaces';
import CustomAPIError from '../errors/customError';
import connection from '../models/connection';

const usersModel = new UsersModel(connection);

export const validateLoginFields = (data: ILoginUser): ILoginUser => {
  const { error, value } = loginSchema.validate(data);

  if (error) throw new CustomAPIError(error.message, StatusCodes.BAD_REQUEST);
  return value;
};

export const validateLoginData = async (data: ILoginUser): Promise<string> => {
  const user = await usersModel.getUserByNameAndPassword(data);

  if (!user || user.password !== data.password) {
    throw new CustomAPIError('Username or password invalid', StatusCodes.UNAUTHORIZED);
  }

  const { id, username } = user;
  return createToken({ id, username });
};
