import connection from '../models/connection';
import { UsersModel } from '../models';
import { IUser } from '../interfaces';
import { createToken } from '../utils/jwt.utils';
import { userSchema } from './validations/schemas';
import CustomAPIError from '../errors/customError';
import getStatusCodeErrValidation from '../errors/httpErrorValidationStatusCode';

class UsersService {
  constructor(private usersModel = new UsersModel(connection)) {}

  public async create(user: IUser): Promise<string> {
    const newUser = await this.usersModel.create(user);
    const { id, username } = newUser;
    return createToken({ id, username });
  }
}

const validateUserFields = (data: IUser): IUser => {
  const { error, value } = userSchema.validate(data);

  if (error) {
    throw new CustomAPIError(error.message, getStatusCodeErrValidation(error.details[0].type));
  }

  return value;
};

export {
  UsersService,
  validateUserFields,
};
