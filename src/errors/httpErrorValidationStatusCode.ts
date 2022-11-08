import { StatusCodes } from 'http-status-codes';

const getStatusCodeErrValidation = (errType: string): number => {
  switch (errType) {
    case 'string.min':
    case 'string.base':
      return StatusCodes.UNPROCESSABLE_ENTITY;
    default:
      return StatusCodes.BAD_REQUEST;
  }
};

export default getStatusCodeErrValidation;
