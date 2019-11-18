import {
  AdminInitiateAuthRequest,
  UpdateUserAttributesRequest,
  ConfirmSignUpRequest,
  GetUserRequest,
  ResendConfirmationCodeRequest,
  ListUsersRequest,
  SignUpRequest,
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import { NodeSignUp } from "../models/Nodes";

export const toAuthConfig = (
  clientId: string,
  poolId: string,
  userName: string,
  password: string
): AdminInitiateAuthRequest => ({
  AuthFlow: "ADMIN_NO_SRP_AUTH",
  ClientId: clientId,
  UserPoolId: poolId,
  AuthParameters: {
    USERNAME: userName,
    PASSWORD: password
  }
});

export const toUpdateAttributeConfig = (AccessToken: string): UpdateUserAttributesRequest => ({
  AccessToken,
  UserAttributes: [
    {
      Name: "custom:firstTimeLogin",
      Value: "0"
    }
  ]
});

export const toConfirmSignUpConfig = (
  clientId: string,
  code: string,
  userName: string
): ConfirmSignUpRequest => ({
  ClientId: clientId,
  ConfirmationCode: code,
  Username: userName
});

export const toGetUserConfig = (token: string): GetUserRequest => ({
  AccessToken: token
});

export const toResendConfirmationCodeConfig = (
  clientId: string,
  userName: string
): ResendConfirmationCodeRequest => ({
  ClientId: clientId,
  Username: userName
});

export const toListUsersConfig = (poolId: string, email: string): ListUsersRequest => ({
  UserPoolId: poolId,
  AttributesToGet: ["email"],
  Filter: `email="${email}"`
});

export const toSignUpConfig = (clientId: string, data: NodeSignUp): SignUpRequest => {
  const { email, firstName, lastName, userName, password } = data;

  const attributeList = [
    {
      Name: "email",
      Value: email
    },
    {
      Name: "custom:firstTimeLogin",
      Value: "1"
    },
    {
      Name: "custom:role",
      Value: "user"
    }
  ];

  if (firstName && lastName) {
    attributeList.push({
      Name: "name",
      Value: `${firstName} ${lastName}`
    });
  }

  if (firstName) {
    attributeList.push({
      Name: "given_name",
      Value: firstName
    });
  }

  if (lastName) {
    attributeList.push({
      Name: "family_name",
      Value: lastName
    });
  }

  return {
    ClientId: clientId,
    Password: password,
    Username: userName,
    UserAttributes: attributeList
  };
};
