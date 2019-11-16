import * as cognito from "../clients/cognito";

import * as authMapper from "../mappers/auth";

import { parseToken } from "../utils/token";

import { ViewAuth } from "../models/Views";
import { ResponseSuccess, ResponseUserView } from "../models/Responses";
import {
  RequestLoginBody,
  RequestConfirmRegistrationBody,
  RequestResendConfirmationCodeBody,
  RequestSignUpBody
} from "../models/Requests";

export const login = async (data: RequestLoginBody): Promise<ViewAuth> => {
  const { userName, password } = data;

  const tokens = await cognito.login(userName, password);

  const { AccessToken } = tokens;

  const user = await cognito.getLoggedInUser(AccessToken);

  const { UserAttributes, Username } = user;

  const node = authMapper.toNodeAuth(UserAttributes, tokens, Username);

  if (node.user.isFirstTimeLogin) {
    await cognito.updateUserAttribute(AccessToken);
  }

  return authMapper.toViewAuth(node);
};

export const logout = async (authorization: string): Promise<ResponseSuccess> => {
  const token = parseToken(authorization);

  return await cognito.logout(token);
};

export const confirmRegistration = async (
  data: RequestConfirmRegistrationBody
): Promise<ResponseSuccess> => {
  const { userName, verificationCode } = data;

  return await cognito.confirmRegistration(verificationCode, userName);
};

export const resendConfirmationCode = async (
  data: RequestResendConfirmationCodeBody
): Promise<ResponseSuccess> => {
  const { userName } = data;

  return await cognito.resendConfirmationCode(userName);
};

export const signUp = async (data: RequestSignUpBody): Promise<ResponseUserView> => {
  const node = authMapper.toNodeSignUp(data);

  const userId = await cognito.signUp(node);

  return { user: authMapper.toViewSignUp(userId, node) };
};

export const validate = async (authorization: string): Promise<ResponseUserView> => {
  const token = parseToken(authorization);

  const result = await cognito.validate(token);

  return { user: authMapper.toViewGetUser(result) };
};
