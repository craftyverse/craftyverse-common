import { SQSClient, SQSClientConfig, ListQueueTagsCommandOutput, CreateQueueCommandOutput, ReceiveMessageCommandOutput } from "@aws-sdk/client-sqs";
export declare const awsSqsClient: {
    createSqsClient: (config: SQSClientConfig) => SQSClient;
    listAllSqsQueues: (config: SQSClientConfig, params: {
        queueNamePrefix: string;
        maxResults: number;
    }) => Promise<ListQueueTagsCommandOutput>;
    createSqsQueue: (config: SQSClientConfig, queueName: string, attributes: {
        delaySeconds: string;
        messageRetentionPeriod: string;
        receiveMessageWaitTimeSeconds: string;
    }) => Promise<CreateQueueCommandOutput | string>;
    getQueueArnByUrl: (config: SQSClientConfig, queueUrl: string) => Promise<string>;
    receiveQueueMessage: (config: SQSClientConfig, queueUrl: string, params: {
        attributeNames: string[];
        maxNumberOfMessages?: number;
        waitTimeSeconds?: number;
    }) => Promise<ReceiveMessageCommandOutput>;
};
