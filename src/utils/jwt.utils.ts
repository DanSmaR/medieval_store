import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomAPIError from '../errors/customError';
import { IUserJWT } from '../interfaces';

dotenv.config();

const createToken = (data: IUserJWT): string => jwt
  .sign({ data }, (process.env.JWT_SECRET as jwt.Secret), {
    expiresIn: '1m',
    algorithm: 'HS256',
  });

const validateToken = (token: string): IUserJWT | undefined => {
  try {
    const { data } = jwt.verify(token, (process.env.JWT_SECRET as jwt.Secret)) as JwtPayload;
    return data;
  } catch (err: any) {
    console.log(err);
    throw new CustomAPIError('Expired or Invalid token', StatusCodes.UNAUTHORIZED);
  }
};

export {
  createToken,
  validateToken,
};
