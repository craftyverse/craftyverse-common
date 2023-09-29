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
     * This will create a sns topic
     * @param config - The AWS credentials
     * @param topicName - Name of the desired topic name
     * @returns {CreateTopicCommandOutput}
     */
    const createSnsTopic = (config, topicName) => __awaiter(void 0, void 0, void 0, function* () {
        const snsClient = createSnsClient(config);
        const topicNameParams = { Name: topicName };
        const extractedTopicNames = [];
        const topicList = yield listAllSnsTopics(config);
        if (topicList && topicList.Topics) {
            topicList.Topics.forEach((topic) => {
                const topicArn = topic.TopicArn;
                const topicArray = topicArn.split(":");
                extractedTopicNames.push(topicArray[topicArray.length - 1]);
            });
            if (extractedTopicNames.find((topic) => topic === topicName)) {
                console.log("Topic name already exists!");
                return "Topic name already exists!";
            }
        }
        console.log("Full topic names: ", topicList);
        const createSnsTopicComamnd = new client_sns_1.CreateTopicCommand(topicNameParams);
        const createSnsTopicResponse = yield snsClient.send(createSnsTopicComamnd);
        console.log(createSnsTopicResponse);
        return createSnsTopicResponse;
    });
    /**
     * This will list all of tje global sns topics
     * @returns {Promise<ListTopicsCommand | undefined>}
     */
    const listAllSnsTopics = (config) => __awaiter(void 0, void 0, void 0, function* () {
        const snsClient = createSnsClient(config);
        const listTopicsParams = {};
        try {
            const listSnsTopicCommand = new client_sns_1.ListTopicsCommand(listTopicsParams);
            const listSnsTopicsResponse = yield snsClient.send(listSnsTopicCommand);
            return listSnsTopicsResponse;
        }
        catch (error) {
            console.log("An error has occured getting the topics!", error);
        }
    });
    /**
     *
     * @param message - Message that is going to be published.
     * @param topicArn - The topic that the message is going to publish to.
     */
    const publishMessage = (config, message, topicArn) => __awaiter(void 0, void 0, void 0, function* () {
        const snsClient = createSnsClient(config);
        const publishMessageParams = {
            Message: message,
            topicArn,
        };
        const publishSnsMessageCommand = new client_sns_1.PublishCommand(publishMessageParams);
        const publishSnsMessageResponse = yield snsClient.send(publishSnsMessageCommand);
        if (publishSnsMessageResponse.$metadata.httpStatusCode !== 200) {
            throw new Error("Failed to publish message");
        }
        return publishSnsMessageResponse;
    });
    return {
        createSnsClient,
        createSnsTopic,
        listAllSnsTopics,
        publishMessage,
    };
})();
