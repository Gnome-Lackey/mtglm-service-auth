import * as aws from "aws-sdk";
import {
  GetUserResponse,
  AuthenticationResultType
} from "aws-sdk/clients/cognitoidentityserviceprovider";

import * as cognitoMapper from "../mappers/cognito";

import AccountConflictException from "../exceptions/AccountConflictException";
import InvalidTokenException from "../exceptions/InvalidTokenException";

import { NodeSignUp } from "../models/Nodes";
import { ResponseSuccess } from "../models/Responses";

const { USER_POOL_ID, CLIENT_ID } = process.env;

const cognito = new aws.CognitoIdentityServiceProvider({ region: "us-east-1" });

export const login = async (
  userName: string,
  password: string
): Promise<AuthenticationResultType> => {
  const authConfig = cognitoMapper.toAuthConfig(CLIENT_ID, USER_POOL_ID, userName, password);

  const response = await cognito.adminInitiateAuth(authConfig).promise();

  return response.AuthenticationResult;
};

export const getLoggedInUser = async (token: string): Promise<GetUserResponse> => {
  const getUserConfig = cognitoMapper.toGetUserConfig(token);

  const response = await cognito.getUser(getUserConfig).promise();

  const isTokenInvalid = !response || !response.UserAttributes;

  if (isTokenInvalid) {
    throw new InvalidTokenException();
  }

  return response;
};

export const updateUserAttribute = async (token: string): Promise<ResponseSuccess> => {
  const updateAttributeConfig = cognitoMapper.toUpdateAttributeConfig(token);

  await cognito.updateUserAttributes(updateAttributeConfig).promise();

  return { message: "successfully updated attribute." };
};

export const logout = async (AccessToken: string): Promise<ResponseSuccess> => {
  await cognito.globalSignOut({ AccessToken }).promise();

  return { message: "successfully logged out." };
};

export const confirmRegistration = async (
  code: string,
  userName: string
): Promise<ResponseSuccess> => {
  const config = cognitoMapper.toConfirmSignUpConfig(CLIENT_ID, code, userName);

  await cognito.confirmSignUp(config).promise();

  return { message: "successfully logged out." };
};

export const resendConfirmationCode = async (userName: string): Promise<ResponseSuccess> => {
  const config = cognitoMapper.toResendConfirmationCodeConfig(CLIENT_ID, userName);

  await cognito.resendConfirmationCode(config).promise();

  return { message: "successfully resent confirmation code." };
};

export const signUp = async (node: NodeSignUp): Promise<string> => {
  const { email } = node;

  const listUsersConfig = cognitoMapper.toListUsersConfig(USER_POOL_ID, email);

  const response = await cognito.listUsers(listUsersConfig).promise();

  const accountWithEmailExists = response && response.Users.length;

  if (accountWithEmailExists) {
    throw new AccountConflictException();
  }

  const signUpConfig = cognitoMapper.toSignUpConfig(CLIENT_ID, node);

  const result = await cognito.signUp(signUpConfig).promise();

  return result.UserSub;
};

export const validate = async (token: string): Promise<GetUserResponse> => {
  const config = cognitoMapper.toGetUserConfig(token);

  const response = await cognito.getUser(config).promise();

  const isTokenInvalid = !response || !response.UserAttributes;

  if (isTokenInvalid) {
    throw new InvalidTokenException();
  }

  return response;
};
