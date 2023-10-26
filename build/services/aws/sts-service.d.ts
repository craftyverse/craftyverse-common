import { GetCallerIdentityCommandOutput, STSClient, STSClientConfig } from "@aws-sdk/client-sts";
export declare const awsStsClient: {
    createStsClient: (config: STSClientConfig) => STSClient;
    getAwsClientId: (config: STSClientConfig) => Promise<GetCallerIdentityCommandOutput>;
};
