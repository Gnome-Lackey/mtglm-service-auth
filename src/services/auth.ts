import * as cognito from "mtglm-service-sdk/build/clients/cognito";
import { MTGLMDynamoClient } from "mtglm-service-sdk/build/clients/dynamo";

import * as authMapper from "mtglm-service-sdk/build/mappers/auth";
import * as playerMapper from "mtglm-service-sdk/build/mappers/player";

import { parseToken } from "mtglm-service-sdk/build/utils/token";

import {
  AuthResponse,
  LoginResponse,
  SuccessResponse
} from "mtglm-service-sdk/build/models/Responses";

import {
  LoginBodyRequest,
  ConfirmRegistrationBodyRequest,
  ResendConfirmationCodeBodyRequest,
  SignUpBodyRequest
} from "mtglm-service-sdk/build/models/Requests";

import { PROPERTIES_PLAYER } from "mtglm-service-sdk/build/constants/mutable_properties";

const { PLAYERS_TABLE_NAME } = process.env;

const dynamo = new MTGLMDynamoClient(PLAYERS_TABLE_NAME, PROPERTIES_PLAYER);

export const login = async (data: LoginBodyRequest): Promise<LoginResponse> => {
  const { userName, password } = data;

  const tokens = await cognito.login(userName, password);

  const { AccessToken } = tokens;

  const user = await cognito.getLoggedInUser(AccessToken);

  const authNode = authMapper.toNodeAuth(user);
  const tokensNode = authMapper.toNodeTokens(tokens);

  if (authNode.user.isFirstTimeLogin) {
    await cognito.updateUserAttribute(AccessToken, [
      {
        Name: "custom:firstTimeLogin",
        Value: "0"
      }
    ]);
  }

  return {
    body: authMapper.toResponseLogin(authNode),
    headers: authMapper.toResponseLoginHeaders(tokensNode)
  };
};

export const logout = async (authorization: string): Promise<SuccessResponse> => {
  const token = parseToken(authorization);

  return await cognito.logout(token);
};

export const confirmRegistration = async (
  data: ConfirmRegistrationBodyRequest
): Promise<SuccessResponse> => {
  const { userName, verificationCode } = data;

  return await cognito.confirmRegistration(verificationCode, userName);
};

export const resendConfirmationCode = async (
  data: ResendConfirmationCodeBodyRequest
): Promise<SuccessResponse> => {
  const { userName } = data;

  return await cognito.resendConfirmationCode(userName);
};

export const signUp = async (data: SignUpBodyRequest): Promise<AuthResponse> => {
  const node = authMapper.toNodeSignUp(data);

  const uid = await cognito.signUp(node);

  const item = playerMapper.toCreateItem(data, uid);

  dynamo.create({ playerId: item.playerId }, item);

  return authMapper.toResponseSignUp(uid, node);
};

export const validate = async (authorization: string): Promise<AuthResponse> => {
  const token = parseToken(authorization);

  const result = await cognito.validate(token);

  return authMapper.toResponseValidate(result);
};
