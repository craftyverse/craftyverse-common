import { SNSClient, PublishCommandOutput, SNSClientConfig, SubscribeCommandOutput } from "@aws-sdk/client-sns";
export declare const awsSnsClient: {
    createSnsClient: (config: SNSClientConfig) => SNSClient;
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
