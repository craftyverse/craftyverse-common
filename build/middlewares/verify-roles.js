"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
const not_authorised_error_1 = require("../errors/not-authorised-error");
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.userRoles)) {
            throw new not_authorised_error_1.NotAuthorisedError();
        }
        const rolesArray = [...allowedRoles];
        req.userRoles.some((role) => {
            return rolesArray.includes(role);
        });
        next();
    };
};
exports.verifyRoles = verifyRoles;
