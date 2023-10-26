import {
  GetCallerIdentityCommand,
  GetCallerIdentityCommandInput,
  GetCallerIdentityCommandOutput,
  STSClient,
  STSClientConfig,
} from "@aws-sdk/client-sts";

export const awsStsClient = (() => {
  let stsClient: STSClient;
  const createStsClient = (config: STSClientConfig): STSClient => {
    if (!stsClient) {
      stsClient = new STSClient(config);
    }

    return stsClient;
  };
  const getAwsClientId = async (
    config: STSClientConfig
  ): Promise<GetCallerIdentityCommandOutput> => {
    const stsClient = createStsClient(config);
    const getCallerIdentityCommand: GetCallerIdentityCommand =
      new GetCallerIdentityCommand({});
    const getCallerIdentityResponse = await stsClient.send(
      getCallerIdentityCommand
    );

    return getCallerIdentityResponse;
  };

  return {
    createStsClient,
    getAwsClientId,
  };
})();
