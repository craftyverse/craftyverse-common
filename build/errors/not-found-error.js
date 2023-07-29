"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor() {
        super('The route that the user has requested does not exist');
        this.statusCode = 404;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialiseErrors() {
        return [
            {
                message: 'The route that you requested does not exist',
                field: 'NotFound',
            },
        ];
    }
}
exports.NotFoundError = NotFoundError;
