"use strict";
// This file will instantiate all of the different AWS resources it needs for the service
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = void 0;
exports.awsConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
    region: process.env.AWS_REGION,
};
