export default class CustomAPIError extends Error {
  statusCode: number;

  class = 'ErrorMade';

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
