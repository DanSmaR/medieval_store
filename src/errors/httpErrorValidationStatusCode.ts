import { StatusCodes } from 'http-status-codes';

const getStatusCodeErrValidation = (errType: string): number => {
  switch (errType) {
    case 'any.required':
      return StatusCodes.BAD_REQUEST;
    default:
      return StatusCodes.UNPROCESSABLE_ENTITY;
  }
};

export default getStatusCodeErrValidation;
