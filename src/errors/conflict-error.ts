import { CustomError } from "./custom-error";
export class ConfictError extends CustomError {
  statusCode = 409;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ConfictError.prototype);
  }

  serialiseErrors(): { message: string; field: string | number }[] {
    return [{ message: this.message, field: "Conflict" }];
  }
}
