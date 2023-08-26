"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorised_error_1 = require("../errors/not-authorised-error");
const requireAuth = (req, res, next) => {
    console.log(req.currentUser);
    if (!req.currentUser) {
        throw new not_authorised_error_1.NotAuthorisedError();
    }
    next();
};
exports.requireAuth = requireAuth;
