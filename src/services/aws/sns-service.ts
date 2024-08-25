import {
  SNSClient,
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
  SNSClientConfig,
  SubscribeCommand,
  SubscribeCommandInput,
  SubscribeCommandOutput,
} from "@aws-sdk/client-sns";
import { BadRequestError } from "../../errors/bad-request-error";

export const awsSnsClient = (() => {
  let snsClient: SNSClient;

  /**
   * This function will generate a default AWS SNS client
   * @returns {SNSClient}
   */
  const createSnsClient = (config: SNSClientConfig): SNSClient => {
    if (!snsClient) {
      snsClient = new SNSClient(config);
    }

    return snsClient;
  };

  /**
   *
   * @param message - Message that is going to be published.
   * @param topicArn - The topic that the message is going to publish to.
   */
  const publishSnsMessage = async (
    config: SNSClientConfig,
    params: {
      message: string;
      subject: string;
      topicArn: string;
    }
  ): Promise<PublishCommandOutput | undefined> => {
    const snsClient = createSnsClient(config);

    const publisSnshMessageParams: PublishCommandInput = {
      Message: params.message,
      Subject: params.subject,
      TopicArn: params.topicArn,
    };

    const publishSnsMessageCommand = new PublishCommand(
      publisSnshMessageParams
    );

    const publishSnsMessageResponse: PublishCommandOutput =
      await snsClient.send(publishSnsMessageCommand);

    if (publishSnsMessageResponse.$metadata.httpStatusCode !== 200) {
      throw new BadRequestError("Failed to publish message");
    }

    return publishSnsMessageResponse;
  };

  const subscribeToTopic = async (
    config: SNSClientConfig,
    params: { topicArn: string; protocol: string; endpoint: string }
  ) => {
    const snsClient = createSnsClient(config);

    const subscribeToSnsTopicParams: SubscribeCommandInput = {
      TopicArn: params.topicArn,
      Protocol: params.protocol,
      Endpoint: params.endpoint,
    };

    const subscribeToSnsTopicCommand = new SubscribeCommand(
      subscribeToSnsTopicParams
    );

    const subscribeToSnsTopicResponse: SubscribeCommandOutput =
      await snsClient.send(subscribeToSnsTopicCommand);

    if (subscribeToSnsTopicResponse.$metadata.httpStatusCode !== 200) {
      throw new BadRequestError("Falied to subscribe to topic");
    }

    return subscribeToSnsTopicResponse;
  };

  return {
    createSnsClient,
    publishSnsMessage,
    subscribeToTopic,
  };
})();
