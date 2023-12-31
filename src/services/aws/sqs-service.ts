import {
  SQSClient,
  SQSClientConfig,
  ListQueuesCommand,
  ListQueuesCommandInput,
  ListQueueTagsCommandOutput,
  ListQueuesCommandOutput,
  CreateQueueCommand,
  CreateQueueCommandInput,
  CreateQueueCommandOutput,
  GetQueueAttributesCommand,
  GetQueueAttributesCommandInput,
  GetQueueAttributesCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  ReceiveMessageCommandOutput,
} from "@aws-sdk/client-sqs";

export const awsSqsClient = (() => {
  let sqsClient: SQSClient;

  const createSqsClient = (config: SQSClientConfig): SQSClient => {
    if (!sqsClient) {
      sqsClient = new SQSClient(config);
    }

    return sqsClient;
  };

  const listAllSqsQueues = async (
    config: SQSClientConfig,
    params: {
      queueNamePrefix: string;
      maxResults: number;
    }
  ): Promise<ListQueuesCommandOutput> => {
    const sqsClient = createSqsClient(config);

    const listAllQueuesParams: ListQueuesCommandInput = {
      QueueNamePrefix: params.queueNamePrefix,
      MaxResults: params.maxResults,
    };

    const listAllQueuesCommand = new ListQueuesCommand(listAllQueuesParams);

    const listAllQueuesResponse = await sqsClient.send(listAllQueuesCommand);
    console.log(listAllQueuesResponse.$metadata);

    return listAllQueuesResponse;
  };

  const getQueueArnByUrl = async (
    config: SQSClientConfig,
    queueUrl: string
  ): Promise<string> => {
    const sqsClient = createSqsClient(config);

    const getQueueParams: GetQueueAttributesCommandInput = {
      QueueUrl: queueUrl,
      AttributeNames: ["QueueArn"],
    };

    const getQueueCommand = new GetQueueAttributesCommand(getQueueParams);

    const getQueueResponse = await sqsClient.send(getQueueCommand);

    return getQueueResponse.Attributes!.QueueArn;
  };

  const createSqsQueue = async (
    config: SQSClientConfig,
    queueName: string,
    attributes: {
      delaySeconds: string;
      messageRetentionPeriod: string; // 7 days
      receiveMessageWaitTimeSeconds: string;
    }
  ): Promise<CreateQueueCommandOutput | string> => {
    const sqsClient = createSqsClient(config);

    const createSqsQueueParams: CreateQueueCommandInput = {
      QueueName: queueName,
      Attributes: {
        DelaySeconds: attributes.delaySeconds,
        MessageRetentionPeriod: attributes.messageRetentionPeriod,
        ReceiveMessageWaitTimeSeconds: attributes.receiveMessageWaitTimeSeconds,
      },
    };

    console.log(createSqsQueueParams);

    const createSqsQueueCommand = new CreateQueueCommand(createSqsQueueParams);

    const createSqsQueueResponse: GetQueueAttributesCommandOutput =
      await sqsClient.send(createSqsQueueCommand);

    console.log(createSqsQueueResponse);

    return createSqsQueueResponse;
  };

  const receiveQueueMessage = async (
    config: SQSClientConfig,
    queueUrl: string,
    params: {
      attributeNames: string[];
      maxNumberOfMessages?: number;
      waitTimeSeconds?: number;
    }
  ) => {
    const sqsClient = createSqsClient(config);

    const receiveQueueMessageParams: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      AttributeNames: params.attributeNames,
      MaxNumberOfMessages: params.maxNumberOfMessages,
      WaitTimeSeconds: params.waitTimeSeconds,
    };

    const receiveQueueMessageCommand = new ReceiveMessageCommand(
      receiveQueueMessageParams
    );

    const receiveQueueMessageResponse = await sqsClient.send(
      receiveQueueMessageCommand
    );

    return receiveQueueMessageResponse;
  };

  return {
    createSqsClient,
    listAllSqsQueues,
    createSqsQueue,
    getQueueArnByUrl,
    receiveQueueMessage,
  };
})();
