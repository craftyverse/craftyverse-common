"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfictError = void 0;
const custom_error_1 = require("./custom-error");
class ConfictError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 409;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, ConfictError.prototype);
    }
    serialiseErrors() {
        return [{ message: this.message, field: "Conflict" }];
    }
}
exports.ConfictError = ConfictError;
