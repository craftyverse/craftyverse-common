import { awsConfig } from "../config/aws.config";
import {
  SNSClient,
  CreateTopicCommand,
  CreateTopicCommandOutput,
  ListTopicsCommand,
  ListTopicsCommandOutput,
  PublishCommand,
  PublishCommandOutput,
} from "@aws-sdk/client-sns";

export const awsSnsClient = (() => {
  let snsClient: SNSClient;

  /**
   * This function will generate a default AWS SNS client
   * @returns {SNSClient}
   */
  const createSnsClient = (): SNSClient => {
    if (!snsClient) {
      snsClient = new SNSClient(awsConfig);
    }

    return snsClient;
  };

  /**
   * This will create a sns topic
   * @param topicName - Name of the desired topic name
   * @returns {CreateTopicCommandOutput}
   */
  const createSnsTopic = async (
    topicName: string
  ): Promise<CreateTopicCommandOutput | null | string> => {
    const snsClient = createSnsClient();
    const topicNameParams = { Name: topicName };
    const extractedTopicNames: string[] = [];

    const topicList: ListTopicsCommandOutput | undefined =
      await listAllSnsTopics();

    if (topicList && topicList.Topics) {
      topicList.Topics.forEach((topic) => {
        const topicArn = topic.TopicArn!;
        const topicArray = topicArn.split(":");
        extractedTopicNames.push(topicArray[topicArray.length - 1]);
      });

      if (extractedTopicNames.find((topic) => topic === topicName)) {
        console.log("Topic name already exists!");
        return "Topic name already exists!";
      }
    }

    console.log("Full topic names: ", topicList);

    const createSnsTopicComamnd = new CreateTopicCommand(topicNameParams);

    const createSnsTopicResponse = await snsClient.send(createSnsTopicComamnd);

    console.log(createSnsTopicResponse);
    return createSnsTopicResponse;
  };

  /**
   * This will list all of tje global sns topics
   * @returns {Promise<ListTopicsCommand | undefined>}
   */
  const listAllSnsTopics = async (): Promise<
    ListTopicsCommandOutput | undefined
  > => {
    const snsClient = createSnsClient();
    const listTopicsParams = {};

    try {
      const listSnsTopicCommand = new ListTopicsCommand(listTopicsParams);
      const listSnsTopicsResponse = await snsClient.send(listSnsTopicCommand);
      return listSnsTopicsResponse;
    } catch (error) {
      console.log("An error has occured getting the topics!", error);
    }
  };

  /**
   *
   * @param message - Message that is going to be published.
   * @param topicArn - The topic that the message is going to publish to.
   */
  const publishMessage = async (
    message: string,
    topicArn: string
  ): Promise<PublishCommandOutput | undefined> => {
    const snsClient = createSnsClient();
    const publishMessageParams = {
      Message: message,
      topicArn,
    };

    const publishSnsMessageCommand = new PublishCommand(publishMessageParams);

    const publishSnsMessageResponse: PublishCommandOutput =
      await snsClient.send(publishSnsMessageCommand);

    if (publishSnsMessageResponse.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to publish message");
    }

    return publishSnsMessageResponse;
  };

  return {
    createSnsClient,
    createSnsTopic,
    listAllSnsTopics,
    publishMessage,
  };
})();
