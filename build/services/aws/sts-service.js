"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsStsClient = void 0;
const client_sts_1 = require("@aws-sdk/client-sts");
exports.awsStsClient = (() => {
    let stsClient;
    const createStsClient = (config) => {
        if (!stsClient) {
            stsClient = new client_sts_1.STSClient(config);
        }
        return stsClient;
    };
    const getAwsClientId = (config) => __awaiter(void 0, void 0, void 0, function* () {
        const stsClient = createStsClient(config);
        const getCallerIdentityCommand = new client_sts_1.GetCallerIdentityCommand({});
        const getCallerIdentityResponse = yield stsClient.send(getCallerIdentityCommand);
        return getCallerIdentityResponse;
    });
    return {
        createStsClient,
        getAwsClientId,
    };
})();
