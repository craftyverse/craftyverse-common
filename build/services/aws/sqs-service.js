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
exports.awsSqsClient = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
exports.awsSqsClient = (() => {
    let sqsClient;
    const createSqsClient = (config) => {
        if (!sqsClient) {
            sqsClient = new client_sqs_1.SQSClient(config);
        }
        return sqsClient;
    };
    const listAllSqsQueues = (config, params) => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClient = createSqsClient(config);
        const listAllQueuesParams = {
            QueueNamePrefix: params.queueNamePrefix,
            MaxResults: params.maxResults,
        };
        const listAllQueuesCommand = new client_sqs_1.ListQueuesCommand(listAllQueuesParams);
        const listAllQueuesResponse = yield sqsClient.send(listAllQueuesCommand);
        console.log(listAllQueuesResponse.$metadata);
        return listAllQueuesResponse;
    });
    const getQueueArnByUrl = (config, queueUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClient = createSqsClient(config);
        const getQueueParams = {
            QueueUrl: queueUrl,
            AttributeNames: ["QueueArn"],
        };
        const getQueueCommand = new client_sqs_1.GetQueueAttributesCommand(getQueueParams);
        const getQueueResponse = yield sqsClient.send(getQueueCommand);
        return getQueueResponse.Attributes.QueueArn;
    });
    const createSqsQueue = (config, queueName, attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClient = createSqsClient(config);
        const createSqsQueueParams = {
            QueueName: queueName,
            Attributes: {
                DelaySeconds: attributes.delaySeconds,
                MessageRetentionPeriod: attributes.messageRetentionPeriod,
                ReceiveMessageWaitTimeSeconds: attributes.receiveMessageWaitTimeSeconds,
            },
        };
        const createSqsQueueCommand = new client_sqs_1.CreateQueueCommand(createSqsQueueParams);
        const createSqsQueueResponse = yield sqsClient.send(createSqsQueueCommand);
        return createSqsQueueResponse;
    });
    const receiveQueueMessage = (config, queueUrl, params) => __awaiter(void 0, void 0, void 0, function* () {
        const sqsClient = createSqsClient(config);
        const receiveQueueMessageParams = {
            QueueUrl: queueUrl,
            AttributeNames: params.attributeNames,
            MaxNumberOfMessages: params.maxNumberOfMessages,
            WaitTimeSeconds: params.waitTimeSeconds,
        };
        const receiveQueueMessageCommand = new client_sqs_1.ReceiveMessageCommand(receiveQueueMessageParams);
        const receiveQueueMessageResponse = yield sqsClient.send(receiveQueueMessageCommand);
        return receiveQueueMessageResponse;
    });
    return {
        createSqsClient,
        listAllSqsQueues,
        createSqsQueue,
        getQueueArnByUrl,
        receiveQueueMessage,
    };
})();
