import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  
  if (err.class) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Database error' });
};

export default errorHandler;
