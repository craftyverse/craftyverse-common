"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request fields');
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serialiseErrors() {
        return this.errors.map((err) => {
            return {
                message: err.message,
                field: err.path[0],
            };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
