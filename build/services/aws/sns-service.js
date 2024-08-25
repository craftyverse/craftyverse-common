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
exports.awsSnsClient = void 0;
const client_sns_1 = require("@aws-sdk/client-sns");
const bad_request_error_1 = require("../../errors/bad-request-error");
exports.awsSnsClient = (() => {
    let snsClient;
    /**
     * This function will generate a default AWS SNS client
     * @returns {SNSClient}
     */
    const createSnsClient = (config) => {
        if (!snsClient) {
            snsClient = new client_sns_1.SNSClient(config);
        }
        return snsClient;
    };
    /**
     *
     * @param message - Message that is going to be published.
     * @param topicArn - The topic that the message is going to publish to.
     */
    const publishSnsMessage = (config, params) => __awaiter(void 0, void 0, void 0, function* () {
        const snsClient = createSnsClient(config);
        const publisSnshMessageParams = {
            Message: params.message,
            Subject: params.subject,
            TopicArn: params.topicArn,
        };
        const publishSnsMessageCommand = new client_sns_1.PublishCommand(publisSnshMessageParams);
        const publishSnsMessageResponse = yield snsClient.send(publishSnsMessageCommand);
        if (publishSnsMessageResponse.$metadata.httpStatusCode !== 200) {
            throw new bad_request_error_1.BadRequestError("Failed to publish message");
        }
        return publishSnsMessageResponse;
    });
    const subscribeToTopic = (config, params) => __awaiter(void 0, void 0, void 0, function* () {
        const snsClient = createSnsClient(config);
        const subscribeToSnsTopicParams = {
            TopicArn: params.topicArn,
            Protocol: params.protocol,
            Endpoint: params.endpoint,
        };
        const subscribeToSnsTopicCommand = new client_sns_1.SubscribeCommand(subscribeToSnsTopicParams);
        const subscribeToSnsTopicResponse = yield snsClient.send(subscribeToSnsTopicCommand);
        if (subscribeToSnsTopicResponse.$metadata.httpStatusCode !== 200) {
            throw new bad_request_error_1.BadRequestError("Falied to subscribe to topic");
        }
        return subscribeToSnsTopicResponse;
    });
    return {
        createSnsClient,
        publishSnsMessage,
        subscribeToTopic,
    };
})();
