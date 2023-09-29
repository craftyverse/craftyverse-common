import { SNSClient, CreateTopicCommandOutput, ListTopicsCommandOutput, PublishCommandOutput, SNSClientConfig } from "@aws-sdk/client-sns";
export declare const awsSnsClient: {
    createSnsClient: (config: SNSClientConfig) => SNSClient;
    createSnsTopic: (config: SNSClientConfig, topicName: string) => Promise<CreateTopicCommandOutput | null | string>;
    listAllSnsTopics: (config: SNSClientConfig) => Promise<ListTopicsCommandOutput | undefined>;
    publishMessage: (config: SNSClientConfig, message: string, topicArn: string) => Promise<PublishCommandOutput | undefined>;
};
