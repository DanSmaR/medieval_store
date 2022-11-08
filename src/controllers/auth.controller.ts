import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services';

const login = async (req: Request, res: Response): Promise<void> => {
  const loginData = authService.validateLoginFields(req.body);
  const token = await authService.validateLoginData(loginData);
  res.status(StatusCodes.OK).json({ token });
};

export default login;
