import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super('The route that the user has requested does not exist');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialiseErrors(): { message: string; field: string | number }[] {
    return [
      {
        message: 'The route that you requested does not exist',
        field: 'NotFound',
      },
    ];
  }
}
