import * as cognito from "mtglm-service-sdk/build/clients/cognito";

import * as authMapper from "mtglm-service-sdk/build/mappers/auth";

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

export const login = async (data: LoginBodyRequest): Promise<LoginResponse> => {
  const { userName, password } = data;

  const tokens = await cognito.login(userName, password);

  const { AccessToken } = tokens;

  const user = await cognito.getLoggedInUser(AccessToken);

  const authNode = authMapper.toNodeAuth(user);
  const tokensNode = authMapper.toNodeTokens(tokens);

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

  return authMapper.toResponseSignUp(uid, node);
};

export const validate = async (authorization: string): Promise<AuthResponse> => {
  const token = parseToken(authorization);

  const result = await cognito.validate(token);

  return authMapper.toResponseValidate(result);
};
