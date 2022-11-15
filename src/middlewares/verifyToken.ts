import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customError';
import { validateToken } from '../utils/jwt.utils';

const verifyTokenMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new CustomAPIError('Token not found', StatusCodes.UNAUTHORIZED);
  const user = validateToken(token);
  req.body.user = user;
  next();
};

export default verifyTokenMiddleware;