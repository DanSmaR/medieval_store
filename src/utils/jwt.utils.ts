import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interfaces';

dotenv.config();

const createToken = (data: IUser): string => jwt
  .sign({ data }, (process.env.JWT_SECRET as jwt.Secret), {
    expiresIn: '1m',
    algorithm: 'HS256',
  });

const validateToken = (token: string): IUser | undefined => {
  try {
    const { data } = jwt.verify(token, (process.env.JWT_SECRET as jwt.Secret)) as JwtPayload;
    return data;
  } catch (err: any) {
    console.error(err.stack);
  }
};

export {
  createToken,
  validateToken,
};
