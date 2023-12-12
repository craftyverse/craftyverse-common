"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const not_authorised_error_1 = require("../errors/not-authorised-error");
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        throw new not_authorised_error_1.NotAuthorisedError();
    }
    const token = Array.isArray(authHeader)
        ? authHeader[0].split(" ")[1]
        : authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.userId = user.UserInfo.userId;
        req.userFirstName = user.UserInfo.userFirstName;
        req.userLastName = user.UserInfo.userLastName;
        req.userEmail = user.UserInfo.userEmail;
        req.userRoles = user.UserInfo.userRoles;
        next();
    });
};
exports.verifyJWT = verifyJWT;
