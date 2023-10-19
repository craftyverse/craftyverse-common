import { SNSClient, PublishCommandOutput, SNSClientConfig, SubscribeCommandOutput } from "@aws-sdk/client-sns";
export declare const awsSnsClient: {
    createSnsClient: (config: SNSClientConfig) => SNSClient;
    createSnsTopic: (config: SNSClientConfig, topicName: string) => Promise<{
        message: string;
        topicArn: string;
    }>;
    getFullTopicArnByTopicName: (config: SNSClientConfig, snsTopicName: string) => Promise<string | undefined>;
    listAllSnsTopics: (config: SNSClientConfig) => Promise<import("@aws-sdk/client-sns").ListTopicsCommandOutput>;
    publishSnsMessage: (config: SNSClientConfig, params: {
        message: string;
        subject: string;
        topicArn: string;
    }) => Promise<PublishCommandOutput | undefined>;
    subscribeToTopic: (config: SNSClientConfig, params: {
        topicArn: string;
        protocol: string;
        endpoint: string;
    }) => Promise<SubscribeCommandOutput>;
};
