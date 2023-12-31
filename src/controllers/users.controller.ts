import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UsersService, validateUserFields } from '../services';

class UsersController {
  constructor(private usersService = new UsersService()) {}

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const newUser = validateUserFields(req.body);
    const token = await this.usersService.create(newUser);
    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UsersController;
