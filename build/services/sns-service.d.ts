import { SNSClient, CreateTopicCommandOutput, ListTopicsCommandOutput, PublishCommandOutput } from "@aws-sdk/client-sns";
export declare const awsSnsClient: {
    createSnsClient: () => SNSClient;
    createSnsTopic: (topicName: string) => Promise<CreateTopicCommandOutput | null | string>;
    listAllSnsTopics: () => Promise<ListTopicsCommandOutput | undefined>;
    publishMessage: (message: string, topicArn: string) => Promise<PublishCommandOutput | undefined>;
};
